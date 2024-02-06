import { useWriteContract } from "wagmi";
import { useUserData } from "./useUserData";
import { useCallback } from "react";
import { CHAIN_ID } from "@/config";
import cErc20Abi from "@/config/abi/CErc20.json";
import { waitForTransactionReceipt } from "viem/actions";
import { publicClient } from "@/lib/viem";

const useWithdraw = (tokenAddress: string) => {
  const { writeContractAsync } = useWriteContract();
  const { refetch } = useUserData();

  const handleWithdraw = useCallback(
    async (amount: string) => {
      const hash = await writeContractAsync({
        abi: cErc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: "redeemUnderlying",
        args: [amount],
        chainId: CHAIN_ID,
      });
      await waitForTransactionReceipt(publicClient, { hash });
      await refetch();
    },
    [writeContractAsync, tokenAddress, refetch]
  );

  return { onWithdraw: handleWithdraw };
};

export default useWithdraw;
