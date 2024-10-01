/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IStakingPoolsInterface extends ethers.utils.Interface {
  functions: {
    "acceptGovernance()": FunctionFragment;
    "claim(uint256)": FunctionFragment;
    "createPool(address)": FunctionFragment;
    "deposit(uint256,uint256)": FunctionFragment;
    "exit(uint256)": FunctionFragment;
    "getPoolRewardRate(uint256)": FunctionFragment;
    "getPoolRewardWeight(uint256)": FunctionFragment;
    "getPoolToken(uint256)": FunctionFragment;
    "getPoolTotalDeposited(uint256)": FunctionFragment;
    "getStakeTotalDeposited(address,uint256)": FunctionFragment;
    "getStakeTotalUnclaimed(address,uint256)": FunctionFragment;
    "governance()": FunctionFragment;
    "pendingGovernance()": FunctionFragment;
    "poolCount()": FunctionFragment;
    "reward()": FunctionFragment;
    "rewardRate()": FunctionFragment;
    "setPendingGovernance(address)": FunctionFragment;
    "setRewardRate(uint256)": FunctionFragment;
    "setRewardWeights(uint256[])": FunctionFragment;
    "tokenPoolIds(address)": FunctionFragment;
    "totalRewardWeight()": FunctionFragment;
    "withdraw(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "acceptGovernance",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "claim", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "createPool", values: [string]): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "exit", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "getPoolRewardRate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPoolRewardWeight",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPoolToken",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPoolTotalDeposited",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getStakeTotalDeposited",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getStakeTotalUnclaimed",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "governance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "pendingGovernance",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "poolCount", values?: undefined): string;
  encodeFunctionData(functionFragment: "reward", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "rewardRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setPendingGovernance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setRewardRate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setRewardWeights",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenPoolIds",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "totalRewardWeight",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "createPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "exit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPoolRewardRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPoolRewardWeight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPoolToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPoolTotalDeposited",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStakeTotalDeposited",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStakeTotalUnclaimed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "governance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "poolCount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "reward", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rewardRate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setPendingGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRewardRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRewardWeights",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenPoolIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalRewardWeight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {};
}

export class IStakingPools extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IStakingPoolsInterface;

  functions: {
    acceptGovernance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "claim(uint256)"(
      _poolId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "claim(uint256,uint256)"(
      _poolId: BigNumberish,
      _claimAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createPool(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposit(
      _poolId: BigNumberish,
      _depositAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    exit(
      _poolId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getPoolRewardRate(
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getPoolRewardWeight(
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getPoolToken(
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getPoolTotalDeposited(
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getStakeTotalDeposited(
      _account: string,
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getStakeTotalUnclaimed(
      _account: string,
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    governance(overrides?: CallOverrides): Promise<[string]>;

    pendingGovernance(overrides?: CallOverrides): Promise<[string]>;

    poolCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    reward(overrides?: CallOverrides): Promise<[string]>;

    rewardRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    setPendingGovernance(
      _pendingGovernance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRewardRate(
      _rewardRate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRewardWeights(
      _rewardWeights: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    tokenPoolIds(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    totalRewardWeight(overrides?: CallOverrides): Promise<[BigNumber]>;

    withdraw(
      _poolId: BigNumberish,
      _withdrawAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  acceptGovernance(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "claim(uint256)"(
    _poolId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "claim(uint256,uint256)"(
    _poolId: BigNumberish,
    _claimAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createPool(
    _token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposit(
    _poolId: BigNumberish,
    _depositAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  exit(
    _poolId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getPoolRewardRate(
    _poolId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getPoolRewardWeight(
    _poolId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getPoolToken(
    _poolId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getPoolTotalDeposited(
    _poolId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getStakeTotalDeposited(
    _account: string,
    _poolId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getStakeTotalUnclaimed(
    _account: string,
    _poolId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  governance(overrides?: CallOverrides): Promise<string>;

  pendingGovernance(overrides?: CallOverrides): Promise<string>;

  poolCount(overrides?: CallOverrides): Promise<BigNumber>;

  reward(overrides?: CallOverrides): Promise<string>;

  rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

  setPendingGovernance(
    _pendingGovernance: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRewardRate(
    _rewardRate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRewardWeights(
    _rewardWeights: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  tokenPoolIds(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  totalRewardWeight(overrides?: CallOverrides): Promise<BigNumber>;

  withdraw(
    _poolId: BigNumberish,
    _withdrawAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptGovernance(overrides?: CallOverrides): Promise<void>;

    "claim(uint256)"(
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "claim(uint256,uint256)"(
      _poolId: BigNumberish,
      _claimAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createPool(_token: string, overrides?: CallOverrides): Promise<BigNumber>;

    deposit(
      _poolId: BigNumberish,
      _depositAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    exit(_poolId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    getPoolRewardRate(
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolRewardWeight(
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolToken(
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getPoolTotalDeposited(
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getStakeTotalDeposited(
      _account: string,
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getStakeTotalUnclaimed(
      _account: string,
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    governance(overrides?: CallOverrides): Promise<string>;

    pendingGovernance(overrides?: CallOverrides): Promise<string>;

    poolCount(overrides?: CallOverrides): Promise<BigNumber>;

    reward(overrides?: CallOverrides): Promise<string>;

    rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

    setPendingGovernance(
      _pendingGovernance: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setRewardRate(
      _rewardRate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setRewardWeights(
      _rewardWeights: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    tokenPoolIds(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    totalRewardWeight(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      _poolId: BigNumberish,
      _withdrawAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    acceptGovernance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "claim(uint256)"(
      _poolId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "claim(uint256,uint256)"(
      _poolId: BigNumberish,
      _claimAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createPool(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposit(
      _poolId: BigNumberish,
      _depositAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    exit(
      _poolId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getPoolRewardRate(
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolRewardWeight(
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolToken(
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolTotalDeposited(
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getStakeTotalDeposited(
      _account: string,
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getStakeTotalUnclaimed(
      _account: string,
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    governance(overrides?: CallOverrides): Promise<BigNumber>;

    pendingGovernance(overrides?: CallOverrides): Promise<BigNumber>;

    poolCount(overrides?: CallOverrides): Promise<BigNumber>;

    reward(overrides?: CallOverrides): Promise<BigNumber>;

    rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

    setPendingGovernance(
      _pendingGovernance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRewardRate(
      _rewardRate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRewardWeights(
      _rewardWeights: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    tokenPoolIds(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    totalRewardWeight(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      _poolId: BigNumberish,
      _withdrawAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptGovernance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "claim(uint256)"(
      _poolId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "claim(uint256,uint256)"(
      _poolId: BigNumberish,
      _claimAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createPool(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      _poolId: BigNumberish,
      _depositAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    exit(
      _poolId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getPoolRewardRate(
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPoolRewardWeight(
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPoolToken(
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPoolTotalDeposited(
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getStakeTotalDeposited(
      _account: string,
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getStakeTotalUnclaimed(
      _account: string,
      _poolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    governance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingGovernance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    poolCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    reward(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewardRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setPendingGovernance(
      _pendingGovernance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRewardRate(
      _rewardRate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRewardWeights(
      _rewardWeights: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    tokenPoolIds(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalRewardWeight(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      _poolId: BigNumberish,
      _withdrawAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}