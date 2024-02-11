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

export default function FaucetButton() {
  const { address: account } = useAccount();

  const { onRequestTokens } = useRequestTokens();

  const { data: allowedToWithdraw } = useReadContract({
    abi: faucetAbi,
    address: ADDRESSES.faucet[CHAIN_ID] as `0x${string}`,
    functionName: "allowedToWithdraw",
    args: [account],
    chainId: CHAIN_ID,
  });

  return (
    <>
      <Button className="w-[80%] mb-4 mx-auto text-black" onClick={onRequestTokens} disabled={!allowedToWithdraw}>
        {"Faucet"}
      </Button>
    </>
  );
}
