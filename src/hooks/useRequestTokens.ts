import { useWriteContract } from "wagmi";
import { useUserData } from "./useUserData";
import { useCallback } from "react";
import { CHAIN_ID } from "@/config";
import faucetABI from "@/config/abi/Faucet.json";
import { waitForTransactionReceipt } from "viem/actions";
import { publicClient } from "@/lib/viem";
import ADDRESSES from "@/config/constants/addresses";

const useRequestTokens = () => {
  const { writeContractAsync } = useWriteContract();
  const { refetch } = useUserData();

  const handleRequestTokens = useCallback(async () => {
    const hash = await writeContractAsync({
      abi: faucetABI,
      address: ADDRESSES.faucet[CHAIN_ID] as `0x${string}`,
      functionName: "requestTokens",
      chainId: CHAIN_ID,
    });
    await waitForTransactionReceipt(publicClient, { hash });
    await refetch();
  }, [writeContractAsync, refetch]);

  return { onRequestTokens: handleRequestTokens };
};

export default useRequestTokens;
