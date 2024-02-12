import { useWriteContract } from "wagmi";
import ComptrollerAbi from "@/config/abi/Comptroller";
import ADDRESSES from "@/config/constants/addresses";
import { CHAIN_ID } from "@/config";
import { useCallback } from "react";
import { useUserData } from "./useUserData";
import { waitForTransactionReceipt } from "viem/actions";
import { publicClient } from "@/lib/viem";

const useExitMarket = (market: `0x${string}`) => {
  const { writeContractAsync } = useWriteContract();
  const { refetch } = useUserData();

  const handleExitMarket = useCallback(async () => {
    const hash = await writeContractAsync({
      abi: ComptrollerAbi,
      address: ADDRESSES.unitroller[CHAIN_ID] as `0x${string}`,
      functionName: "exitMarket",
      args: [market],
      chainId: CHAIN_ID,
    });
    await waitForTransactionReceipt(publicClient, { hash });
    await refetch();
  }, [writeContractAsync, market, refetch]);

  return { onExitMarket: handleExitMarket };
};

export default useExitMarket;
