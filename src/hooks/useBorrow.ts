import { useCallback } from "react";
import { toast } from "react-toastify";
import { useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "viem/actions";
import { CHAIN_ID } from "@/config";
import cErc20Abi from "@/config/abi/CErc20";
import { publicClient } from "@/lib/viem";
import { useUserData } from "./useUserData";

const useBorrow = (tokenAddress: `0x${string}`) => {
  const { writeContractAsync } = useWriteContract();
  const { refetch } = useUserData();
  const handleBorrow = useCallback(
    async (amount: bigint) => {
      const hash = await writeContractAsync({
        abi: cErc20Abi,
        address: tokenAddress,
        functionName: "borrow",
        args: [amount],
        chainId: CHAIN_ID,
      });
      await waitForTransactionReceipt(publicClient, { hash });
      toast.success("Borrow successful");
      await refetch();
    },
    [writeContractAsync, tokenAddress, refetch]
  );

  return { onBorrow: handleBorrow };
};

export default useBorrow;
