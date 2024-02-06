import { useWriteContract } from "wagmi";
import ComptrollerAbi from "@/config/abi/Comptroller.json";
import ADDRESSES from "@/config/constants/addresses";
import { CHAIN_ID } from "@/config";
import { useCallback } from "react";
import { useUserData } from "./useUserData";
import { waitForTransactionReceipt } from "viem/actions";
import { publicClient } from "@/lib/viem";

const useEnterMarkets = (markets: string[]) => {
  const { writeContractAsync } = useWriteContract();
  const { refetch } = useUserData();

  const handleEnterMarkets = useCallback(async () => {
    const hash = await writeContractAsync({
      abi: ComptrollerAbi,
      address: ADDRESSES.unitroller[CHAIN_ID] as `0x${string}`,
      functionName: "enterMarkets",
      args: [markets],
      chainId: CHAIN_ID,
    });
    await waitForTransactionReceipt(publicClient, { hash });
    await refetch();
  }, [writeContractAsync, markets, refetch]);

  return { onEnterMarkets: handleEnterMarkets };
};

export default useEnterMarkets;
