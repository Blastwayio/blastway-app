import { useCallback } from "react";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "viem/actions";
import cErc20Abi from "@/config/abi/CErc20";
import { CHAIN_ID } from "@/config";
import { publicClient } from "@/lib/viem";
import { useUserData } from "./useUserData";

const useApprove = (tokenAddress: `0x${string}`, spender: `0x${string}`) => {
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();
  const { refetch } = useUserData();

  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    abi: cErc20Abi,
    address: tokenAddress,
    functionName: "allowance",
    args: [account || (ethers.ZeroAddress as `0x${string}`), spender],
    chainId: CHAIN_ID,
  });

  const handleApprove = useCallback(async () => {
    const hash = await writeContractAsync({
      abi: cErc20Abi,
      address: tokenAddress,
      functionName: "approve",
      args: [spender, ethers.MaxUint256],
      chainId: CHAIN_ID,
    });
    await waitForTransactionReceipt(publicClient, { hash });
    toast.success("Approval successful");
    await refetch();
    await refetchAllowance();
  }, [writeContractAsync, tokenAddress, spender, refetch, refetchAllowance]);

  return { allowanceData, onApprove: handleApprove };
};

export default useApprove;
