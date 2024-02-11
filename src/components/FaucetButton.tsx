"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "./ui/button";
import { useAccount } from "wagmi";
import Link from "next/link";
import { useState } from "react"; // Import useState

export default function FaucetButton() {
  const { address: account } = useAccount();

  return (
    <>
      <Button className="w-[80%] mb-4 mx-auto text-black">{"Faucet"}</Button>
    </>
  );
}
