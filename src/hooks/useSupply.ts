import { useCallback } from "react";
import { toast } from "react-toastify";
import { useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "viem/actions";
import cErc20Abi from "@/config/abi/CErc20";
import { CHAIN_ID } from "@/config";
import { useUserData } from "./useUserData";
import { publicClient } from "@/lib/viem";

const useSupply = (tokenAddress: `0x${string}`) => {
  const { writeContractAsync } = useWriteContract();
  const { refetch } = useUserData();

  const handleSupply = useCallback(
    async (amount: bigint) => {
      const hash = await writeContractAsync({
        abi: cErc20Abi,
        address: tokenAddress,
        functionName: "mint",
        args: [amount],
        chainId: CHAIN_ID,
      });
      await waitForTransactionReceipt(publicClient, { hash });
      toast.success("Supply successful");
      await refetch();
    },
    [writeContractAsync, tokenAddress, refetch]
  );

  return { onSupply: handleSupply };
};

export default useSupply;
