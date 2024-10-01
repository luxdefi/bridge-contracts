module.exports = {
  norpc: true,
  measureStatementCoverage: true,
  measureFunctionCoverage: true,
  testCommand: "npm test",
  compileCommand: "npm run compile",
  providerOptions: {
    default_balance_ether: "10000000000000000000000000",
    allowUnlimitedContractSize: true,
    gasLimit: 0xfffffffffff,
    gasPrice: 0x0,
  },
  mocha: {
    timeout: 2000000,
    useColors: true,
  },
  skipFiles: [
    "adapters/interfaces/IConfiguration.sol",
    "adapters/interfaces/IDistribute.sol",
    "adapters/interfaces/IFinancing.sol",
    "adapters/interfaces/IGuildKick.sol",
    "adapters/interfaces/IManaging.sol",
    "adapters/interfaces/IOnboarding.sol",
    "adapters/interfaces/IRagequit.sol",
    "adapters/interfaces/ISignatures.sol",
    "adapters/interfaces/IVoting.sol",
    "extensions/IExtension.sol",
    "helpers/WETH.sol",
    "test/MockDao.sol",
    "test/ERC1155TestToken.sol",
    "test/ERC20Minter.sol",
    "test/OLToken.sol",
    "test/PixelNFT.sol",
    "test/ProxToken.sol",
    "test/TestFairShareCalc.sol",
    "test/TestToken1.sol",
    "test/TestToken2.sol",
    "test/ERC1155TestAdapter.sol",
    "test/ERC721TestAdapter.sol",
    "test/CloneFactoryTest.sol",
    "test/TributeERC721V2.sol",
    "utils/Multicall.sol",
    "companion/interfaces/IReimbursement.sol",
    "companion/GelatoBytes.sol",
    "companion/Gelatofied.sol",
    "companion/GelatoRelay.sol",
  ],
};