import { useAccount, useWriteContract } from "wagmi";
import SwapRouterAbi from "@/config/abi/SwapRouter";
import ADDRESSES from "@/config/constants/addresses";
import { CHAIN_ID } from "@/config";
import { waitForTransactionReceipt } from "viem/actions";
import { publicClient } from "@/lib/viem";
import { toast } from "react-toastify";
import type { SwapParams } from "@/types";
import { useCallback } from "react";

const useSwap = () => {
  const { address: account } = useAccount();

  const { writeContractAsync } = useWriteContract();

  const handleSwap = useCallback(
    async (params: SwapParams) => {
      try {
        const { fromToken, toToken, fromAmount, toAmount, slippage, recipient, deadline } = params;
        const fromAmountWithDecimals = BigInt(fromAmount * 1e18);
        const toAmountWithDecimals = BigInt(toAmount * 1e18);
        const recipientAddress = recipient || account;
        const deadlineTimestamp = Math.floor(Date.now() / 1000) + 60 * 20;
        const deadlineWithBuffer = deadline || deadlineTimestamp;

        const path = [fromToken, toToken];
        console.log("path", path);

        const txHash = await writeContractAsync({
          abi: SwapRouterAbi,
          address: ADDRESSES.swapRouter[CHAIN_ID] as `0x${string}`,
          functionName: "swapExactTokensForTokens",
          args: [fromAmountWithDecimals, toAmountWithDecimals, path, recipientAddress, deadlineWithBuffer],
          chainId: CHAIN_ID,
        });

        await waitForTransactionReceipt(publicClient, { hash: txHash });
        toast.success("Swap successful!");
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    [account, writeContractAsync]
  );

  return { onSwap: handleSwap };
};

export default useSwap;
