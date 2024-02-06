import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import cErc20Abi from "@/config/abi/CErc20.json";
import { CHAIN_ID } from "@/config";
import { useUserData } from "./useUserData";
import { waitForTransactionReceipt } from "viem/actions";
import { publicClient } from "@/lib/viem";

const useSupply = (tokenAddress: string) => {
  const { writeContractAsync, data } = useWriteContract();
  const { refetch } = useUserData();

  const handleSupply = useCallback(
    async (amount: string) => {
      const hash = await writeContractAsync({
        abi: cErc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: "mint",
        args: [amount],
        chainId: CHAIN_ID,
      });
      console.log("data", data);
      await waitForTransactionReceipt(publicClient, { hash });
      await refetch();
    },
    [writeContractAsync, tokenAddress, refetch]
  );

  return { onSupply: handleSupply };
};

export default useSupply;
