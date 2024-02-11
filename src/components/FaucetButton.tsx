"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "./ui/button";
import { useAccount, useReadContract } from "wagmi";
import Link from "next/link";
import { useState } from "react"; // Import useState
import useRequestTokens from "@/hooks/useRequestTokens";
import { CHAIN_ID } from "@/config";
import faucetAbi from "@/config/abi/Faucet.json";
import ADDRESSES from "@/config/constants/addresses";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function FaucetButton() {
  const { address: account } = useAccount();
  const [disabled, setDisabled] = useState(false);

  const { onRequestTokens } = useRequestTokens();

  const { data: allowedToWithdraw } = useReadContract({
    abi: faucetAbi,
    address: ADDRESSES.faucet[CHAIN_ID] as `0x${string}`,
    functionName: "allowedToWithdraw",
    args: [account],
    chainId: CHAIN_ID,
  });

  const onButtonClick = async () => {
    try {
      setDisabled(true);
      await onRequestTokens();
    } catch (e) {
      console.error(e);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="w-[80%] mb-4 mx-auto text-black"
              onClick={onButtonClick}
              disabled={!allowedToWithdraw || disabled}
            >
              {"Token Faucet"}
            </Button>
          </TooltipTrigger>
          {!allowedToWithdraw && (
            <TooltipContent className="bg-[#18181b] border-none text-white">
              <p>You can claim again in 24 hours</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
