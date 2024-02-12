import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import cErc20Abi from "@/config/abi/CErc20";
import { CHAIN_ID } from "@/config";
import { useUserData } from "./useUserData";
import { waitForTransactionReceipt } from "viem/actions";
import { publicClient } from "@/lib/viem";

const useSupply = (tokenAddress: `0x${string}`) => {
  const { writeContractAsync, data } = useWriteContract();
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
      console.log("data", data);
      await waitForTransactionReceipt(publicClient, { hash });
      await refetch();
    },
    [writeContractAsync, tokenAddress, refetch]
  );

  return { onSupply: handleSupply };
};

export default useSupply;
