// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {BaseSmartAccount, IEntryPoint, UserOperation} from "../BaseSmartAccount.sol";
import {ModuleManager} from "../base/ModuleManager.sol";
import {FallbackManager} from "../base/FallbackManager.sol";
import {SignatureDecoder} from "../common/SignatureDecoder.sol";
import {SecuredTokenTransfer} from "../common/SecuredTokenTransfer.sol";
import {LibAddress} from "../libs/LibAddress.sol";
import {ISignatureValidator} from "../interfaces/ISignatureValidator.sol";
import {IERC165} from "../interfaces/IERC165.sol";
import {ReentrancyGuard} from "../common/ReentrancyGuard.sol";
import {SmartAccountErrors} from "../common/Errors.sol";
import {ECDSA} from "@openzeppelin/standard/utils/cryptography/ECDSA.sol";
import {IAuthorizationModule} from "../interfaces/IAuthorizationModule.sol";

/**
 * @title SmartAccount - EIP-4337 compatible smart contract wallet.
 * @dev This contract is the base for the Smart Account functionality.
 *         - It provides the functionality to execute both gnosis-style txns and AA (EIP-4337) userOps
 *         - It allows to receive and manage assets.
 *         - It is responsible for managing the modules and fallbacks.
 *         - The Smart Account can be extended with smodules, such as Social Recovery, Session Key and others.
 * @author Chirag Titiya - <chirag@biconomy.io>
 */
contract SmartAccountNoAuth is
    BaseSmartAccount,
    ModuleManager,
    FallbackManager,
    SignatureDecoder,
    SecuredTokenTransfer,
    IERC165,
    ReentrancyGuard,
    SmartAccountErrors,
    ISignatureValidator
{
    using ECDSA for bytes32;
    using LibAddress for address;

    // Storage Version
    string public constant VERSION = "1.0.0";

    // Domain Seperators keccak256("EIP712Domain(uint256 chainId,address verifyingContract)");
    bytes32 internal constant DOMAIN_SEPARATOR_TYPEHASH =
        0x47e79534a245952e8b16893a336b85a3d9ea9fa8c573f3d803afb92a79469218;

    // solhint-disable-next-line
    // keccak256("AccountTx(address to,uint256 value,bytes data,uint8 operation,uint256 targetTxGas,uint256 baseGas,uint256 gasPrice,uint256 tokenGasPriceFactor,address gasToken,address refundReceiver,uint256 nonce)");
    bytes32 internal constant ACCOUNT_TX_TYPEHASH =
        0xda033865d68bf4a40a5a7cb4159a99e33dba8569e65ea3e38222eb12d9e66eee;

    // /!\ Owner storage. Deprecated. Left for storage layout compatibility /!\
    address public ownerDeprecated;

    // changed to 2D nonce below
    // @notice there is no _nonce
    mapping(uint256 => uint256) public nonces;

    // AA immutable storage
    IEntryPoint private immutable ENTRY_POINT;
    uint256 private immutable CHAIN_ID;
    address private immutable SELF;

    // Events

    event ImplementationUpdated(
        address indexed oldImplementation,
        address indexed newImplementation
    );
    event AccountHandlePayment(bytes32 indexed txHash, uint256 indexed payment);
    event SmartAccountReceivedNativeToken(
        address indexed sender,
        uint256 indexed value
    );

    /**
     * @dev Constructor that sets the owner of the contract and the entry point contract.
     *      _modules[SENTINEL_MODULES] = SENTINEL_MODULES protects implementation from initialization
     * @param anEntryPoint The address of the entry point contract.
     */
    constructor(IEntryPoint anEntryPoint) {
        _modules[SENTINEL_MODULES] = SENTINEL_MODULES;
        SELF = address(this);
        if (address(anEntryPoint) == address(0))
            revert EntryPointCannotBeZero();
        ENTRY_POINT = anEntryPoint;
        CHAIN_ID = block.chainid;
    }

    /**
     * @dev This function is a special fallback function that is triggered when the contract receives Ether.
     * It logs an event indicating the amount of Ether received and the sender's address.
     * @notice This function is marked as external and payable, meaning it can be called from external
     * sources and accepts Ether as payment.
     */
    receive() external payable {
        if (address(this) == SELF) revert DelegateCallsOnly();
        emit SmartAccountReceivedNativeToken(msg.sender, msg.value);
    }

    /**
     * @dev Initialize the Smart Account with required states
     * @param handler Default fallback handler provided in Smart Account
     * @param moduleSetupContract Initializes the auth module; can be a factory or registry for multiple accounts.
     * @param moduleSetupData modules setup data (a standard calldata for the module setup contract)
     * @notice devs need to make sure it is only callble once by initiazer or state check restrictions
     * @notice any further implementations that introduces a new state must have a reinit method
     * @notice reinit is not possible, as _initialSetupModules reverts if the account is already initialized
     *         which is when there is at least one enabled module
     */
    function init(
        address handler,
        address moduleSetupContract,
        bytes calldata moduleSetupData
    ) external virtual override returns (address) {
        _setFallbackHandler(handler);
        return _initialSetupModules(moduleSetupContract, moduleSetupData);
    }

    /**
     * @dev Interface function with the standard name for execute_ncC
     * @param dest Address of the contract to call
     * @param value Amount of native tokens to send along with the transaction
     * @param func Data of the transaction
     */
    function execute(
        address dest,
        uint256 value,
        bytes calldata func
    ) external {
        execute_ncC(dest, value, func);
    }

    /**
     * @dev Interface function with the standard name for executeBatch_y6U
     * @param dest Addresses of the contracts to call
     * @param value Amounts of native tokens to send along with the transactions
     * @param func Data of the transactions
     */
    function executeBatch(
        address[] calldata dest,
        uint256[] calldata value,
        bytes[] calldata func
    ) external {
        executeBatch_y6U(dest, value, func);
    }

    function validateUserOp(
        UserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external virtual override returns (uint256 validationData) {
        if (msg.sender != address(entryPoint()))
            revert CallerIsNotAnEntryPoint(msg.sender);

        (, address validationModule) = abi.decode(
            userOp.signature,
            (bytes, address)
        );
        if (address(_modules[validationModule]) != address(0)) {
            validationData = IAuthorizationModule(validationModule)
                .validateUserOp(userOp, userOpHash);
        } else {
            revert WrongValidationModule(validationModule);
        }
        _payPrefund(missingAccountFunds);
    }

    /**
     * @dev Adds a module to the allowlist.
     * @notice This can only be done via a userOp or a selfcall.
     * @notice Enables the module `module` for the wallet.
     * @param module Module to be allow-listed.
     */
    function enableModule(address module) external virtual override {
        _requireFromEntryPointOrSelf();
        _enableModule(module);
    }

    /**
     * @dev Setups module for this Smart Account and enables it.
     * @notice This can only be done via userOp or a selfcall.
     * @notice Enables the module `module` for the wallet.
     */
    function setupAndEnableModule(
        address setupContract,
        bytes memory setupData
    ) external virtual override returns (address) {
        _requireFromEntryPointOrSelf();
        return _setupAndEnableModule(setupContract, setupData);
    }

    function setFallbackHandler(address handler) external virtual override {
        _requireFromEntryPoint();
        _setFallbackHandler(handler);
    }

    /**
     * @notice Query if a contract implements an interface
     * @param _interfaceId The interface identifier, as specified in ERC165
     * @return `true` if the contract implements `_interfaceID`
     */
    function supportsInterface(
        bytes4 _interfaceId
    ) external view virtual override returns (bool) {
        return _interfaceId == type(IERC165).interfaceId; // 0x01ffc9a7
    }

    /**
     * @dev Returns the address of the implementation contract associated with this contract.
     * @notice The implementation address is stored in the contract's storage slot with index 0.
     */
    function getImplementation()
        external
        view
        returns (address _implementation)
    {
        assembly {
            _implementation := sload(address())
        }
    }

    /**
     * @notice All the new implementations MUST have this method!
     * @notice Updates the implementation of the base wallet
     * @param _implementation New wallet implementation
     */
    function updateImplementation(address _implementation) public virtual {
        _requireFromEntryPointOrSelf();
        require(_implementation != address(0), "Address cannot be zero");
        if (!_implementation.isContract())
            revert InvalidImplementation(_implementation);
        address oldImplementation;

        assembly {
            oldImplementation := sload(address())
            sstore(address(), _implementation)
        }
        emit ImplementationUpdated(oldImplementation, _implementation);
    }

    /* solhint-disable func-name-mixedcase */

    /**
     * @dev Execute a transaction (called directly from owner, or by entryPoint)
     * @notice Name is optimized for this method to be cheaper to be called
     * @param dest Address of the contract to call
     * @param value Amount of native tokens to send along with the transaction
     * @param func Data of the transaction
     */
    function execute_ncC(
        address dest,
        uint256 value,
        bytes calldata func
    ) public {
        _requireFromEntryPoint();
        _call(dest, value, func);
    }

    /**
     * @dev Execute a sequence of transactions
     * @notice Name is optimized for this method to be cheaper to be called
     * @param dest Addresses of the contracts to call
     * @param value Amounts of native tokens to send along with the transactions
     * @param func Data of the transactions
     */
    function executeBatch_y6U(
        address[] calldata dest,
        uint256[] calldata value,
        bytes[] calldata func
    ) public {
        _requireFromEntryPoint();
        if (
            dest.length == 0 ||
            dest.length != value.length ||
            value.length != func.length
        ) revert WrongBatchProvided(dest.length, value.length, func.length, 0);
        for (uint256 i; i < dest.length; ) {
            _call(dest[i], value[i], func[i]);
            unchecked {
                ++i;
            }
        }
    }

    /* solhint-enable func-name-mixedcase */

    /**
     * @dev Deposit more funds for this account in the entryPoint
     */
    function addDeposit() public payable {
        entryPoint().depositTo{value: msg.value}(address(this));
    }

    /**
     * @dev Withdraw value from the account's deposit
     * @param withdrawAddress target to send to
     * @param amount to withdraw
     */
    function withdrawDepositTo(
        address payable withdrawAddress,
        uint256 amount
    ) public payable {
        _requireFromEntryPointOrSelf();
        entryPoint().withdrawTo(withdrawAddress, amount);
    }

    /**
     * @dev Removes a module from the allowlist.
     * @notice This can only be done via a wallet transaction.
     * @notice Disables the module `module` for the wallet.
     * @param prevModule Module that pointed to the module to be removed in the linked list
     * @param module Module to be removed.
     */
    function disableModule(address prevModule, address module) public virtual {
        _requireFromEntryPointOrSelf();
        _disableModule(prevModule, module);
    }

    /**
     * @dev Returns the current entry point used by this account.
     * @return EntryPoint as an `IEntryPoint` interface.
     * @dev This function should be implemented by the subclass to return the current entry point used by this account.
     */
    function entryPoint() public view virtual override returns (IEntryPoint) {
        return ENTRY_POINT;
    }

    /**
     * @dev Returns the domain separator for this contract, as defined in the EIP-712 standard.
     * @return bytes32 The domain separator hash.
     */
    function domainSeparator() public view returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    DOMAIN_SEPARATOR_TYPEHASH,
                    block.chainid,
                    address(this)
                )
            );
    }

    /**
     * @notice Returns the ID of the chain the contract is currently deployed on.
     * @return CHAIN_ID The ID of the current chain as a uint256.
     */
    function getChainId() public view returns (uint256) {
        return CHAIN_ID;
    }

    /**
     * @dev returns a value from the nonces 2d mapping
     * @param batchId : the key of the user's batch being queried
     * @return nonce : the number of transactions made within said batch
     */
    function getNonce(uint256 batchId) public view virtual returns (uint256) {
        return nonces[batchId];
    }

    /**
     * Implementation of ISignatureValidator (see `interfaces/ISignatureValidator.sol`)
     * @dev If owner is a smart-contract (other smart contract wallet or module, that controls
     *      signature verifications - like multisig), forward isValidSignature request to it.
     *      In case of multisig, _signature can be several concatenated signatures
     *      If owner is EOA, perform a regular ecrecover.
     * @param ethSignedDataHash 32 bytes hash of the data signed on the behalf of address(msg.sender)
     *                          prepended with '\x19Ethereum Signed Message:\n'
     * @param signature Signature byte array associated with ethSignedDataHash
     * @return bytes4 value.
     */
    function isValidSignature(
        bytes32 ethSignedDataHash,
        bytes memory signature
    ) public view override returns (bytes4) {
        (bytes memory moduleSignature, address validationModule) = abi.decode(
            signature,
            (bytes, address)
        );
        if (address(_modules[validationModule]) != address(0)) {
            return
                ISignatureValidator(validationModule).isValidSignature(
                    ethSignedDataHash,
                    moduleSignature
                );
        } else {
            revert WrongValidationModule(validationModule);
        }
    }

    /**
     * @dev Check current account deposit in the entryPoint
     */
    function getDeposit() public view returns (uint256) {
        return entryPoint().balanceOf(address(this));
    }

    /**
     * @dev internal method that fecilitates the extenral calls from SmartAccount
     * @dev similar to execute() of Executor.sol
     * @param target destination address contract/non-contract
     * @param value amount of native tokens
     * @param data function singature of destination
     */
    function _call(address target, uint256 value, bytes memory data) internal {
        assembly {
            let success := call(
                gas(),
                target,
                value,
                add(data, 0x20),
                mload(data),
                0,
                0
            )
            let ptr := mload(0x40)
            returndatacopy(ptr, 0, returndatasize())
            if iszero(success) {
                revert(ptr, returndatasize())
            }
        }
    }

    /**
     * @dev This function allows the owner or entry point to execute certain actions.
     * If the caller is not authorized, the function will revert with an error message.
     * @notice This modifier is marked as internal and can only be called within the contract itself.
     */
    function _requireFromEntryPointOrSelf() internal view {
        if (msg.sender != address(entryPoint()) && msg.sender != address(this))
            revert CallerIsNotEntryPointOrSelf(msg.sender);
    }

    /**
     * @dev This function allows the owner or entry point to execute certain actions.
     * If the caller is not authorized, the function will revert with an error message.
     * @notice This modifier is marked as internal and can only be called within the contract itself.
     */
    function _requireFromEntryPoint() internal view {
        if (msg.sender != address(entryPoint()))
            revert CallerIsNotEntryPoint(msg.sender);
    }
}
