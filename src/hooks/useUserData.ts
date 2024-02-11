import { useAccount, useReadContracts } from "wagmi";
import assets from "@/config/constants/assets";
import cErc20Abi from "@/config/abi/CErc20.json";
import comptrollerAbi from "@/config/abi/Comptroller.json";
import { Abi } from "viem";
import ADDRESSES from "@/config/constants/addresses";
import { CHAIN_ID } from "@/config";
import { CToken } from "@/types";

/*
 * This hook is used to get the user data from the blockchain
 * It returns the user's balance, borrow balance, supply balance, and liquidity
 * @param cTokens - The cTokens to get the user data from. It's optional because if not given, it will only return refetch function
 */
export const useUserData = (cTokens?: CToken[]) => {
  const { address: account } = useAccount();

  const userCalls = [
    ...assets
      .map(({ address, underlyingToken }) => [
        // user balance of underlying token
        {
          address: underlyingToken.address,
          abi: cErc20Abi as Abi,
          functionName: "balanceOf",
          args: [account],
          chainId: CHAIN_ID,
        },

        // user balance of cToken
        {
          address,
          abi: cErc20Abi as Abi,
          functionName: "balanceOf",
          args: [account],
          chainId: CHAIN_ID,
        },

        // user balance of cToken
        {
          address,
          abi: cErc20Abi as Abi,
          functionName: "borrowBalanceStored",
          args: [account],
          chainId: CHAIN_ID,
        },
        {
          address: ADDRESSES.unitroller[CHAIN_ID] as `0x${string}`,
          abi: comptrollerAbi as Abi,
          functionName: "checkMembership",
          args: [account, address],
          chainId: CHAIN_ID,
        },
      ])
      .flat(),
  ];

  const contracts = [
    ...userCalls,
    {
      address: ADDRESSES.unitroller[CHAIN_ID] as `0x${string}`,
      abi: comptrollerAbi as Abi,
      functionName: "getAccountLiquidity",
      args: [account],
      chainId: CHAIN_ID,
    },
  ];

  const { data, refetch } = useReadContracts({ contracts });

  if (!cTokens) return { refetch };

  const tokenData = cTokens.map(({ address, symbol, oneCTokenInUnderlying, collateralFactor, underlyingToken }, i) => {
    const underlyingBalance = data?.[i * 4]?.result as bigint;
    const cTokenBalance = data?.[i * 4 + 1]?.result as bigint;
    const borrowBalance = data?.[i * 4 + 2]?.result as bigint;
    const isInMarket = data?.[i * 4 + 3]?.result as boolean;

    const underlyingBalanceFormatted = Number(underlyingBalance || 0) / 10 ** underlyingToken.decimals;

    const supplyBalance = (Number(cTokenBalance || 0) * Number(oneCTokenInUnderlying || 0)) / 1e8;
    const borrowBalanceFormatted = Number(borrowBalance || 0) / 10 ** underlyingToken.decimals;
    const cTokenBalanceFormatted = Number(cTokenBalance || 0) / 1e8;

    return {
      symbol,
      address,
      collateralFactor,
      underlyingBalance: underlyingBalanceFormatted.toFixed(4),
      cTokenBalance: cTokenBalanceFormatted?.toFixed(4),
      borrowBalance: borrowBalanceFormatted?.toFixed(4),
      supplyBalance: supplyBalance.toFixed(4),
      isInMarket,
    };
  });

  const totalBorrowBalance = tokenData.reduce((acc, { borrowBalance }) => acc + Number(borrowBalance), 0) || 0;
  const totalSupplyBalance = tokenData.reduce((acc, { supplyBalance }) => acc + Number(supplyBalance), 0) || 0;

  //@ts-ignore
  const borrowLimit = Number(data?.[data.length - 1]?.result?.[1]) / 1e18 || 0;

  const accountLiquidity = Number((data?.[data.length - 1]?.result as bigint[])?.[1]) / 1e18;
  const borrowPercentage = (totalBorrowBalance / (borrowLimit || 1)) * 100;

  return {
    tokenData,
    accountLiquidity: accountLiquidity.toString(),
    totalBorrowBalance,
    totalSupplyBalance,
    borrowLimit,
    borrowPercentage,
    refetch,
  };
};
