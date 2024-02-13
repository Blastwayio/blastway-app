import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useUserData } from "./useUserData";
import { useCallback } from "react";
import { CHAIN_ID } from "@/config";
import faucetABI from "@/config/abi/Faucet";
import { waitForTransactionReceipt } from "viem/actions";
import { publicClient } from "@/lib/viem";
import ADDRESSES from "@/config/constants/addresses";
import faucetAbi from "@/config/abi/Faucet";

const useRequestTokens = () => {
  const { address: account } = useAccount()
  const { writeContractAsync } = useWriteContract();
  const { refetch } = useUserData();

  const { data: allowedToWithdraw, refetch: refetchAllowedToWithdraw } = useReadContract({
    abi: faucetAbi,
    address: ADDRESSES.faucet[CHAIN_ID] as `0x${string}`,
    functionName: "allowedToWithdraw",
    args: [account || "0x"],
    chainId: CHAIN_ID,
  });

  const handleRequestTokens = useCallback(async () => {
    const hash = await writeContractAsync({
      abi: faucetABI,
      address: ADDRESSES.faucet[CHAIN_ID] as `0x${string}`,
      functionName: "requestTokens",
      chainId: CHAIN_ID,
    });
    await waitForTransactionReceipt(publicClient, { hash });
    await refetch();
    await refetchAllowedToWithdraw();
  }, [writeContractAsync, refetch]);

  return { allowedToWithdraw, onRequestTokens: handleRequestTokens, refetchAllowedToWithdraw };
};

export default useRequestTokens;
