"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "./ui/button";
import { useAccount } from "wagmi";
import { formatAddress } from "@/lib/utils";

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const { address: account } = useAccount();

  return (
    <Button className="w-[80%] mb-4 mx-auto" onClick={() => open()}>
      {account ? formatAddress(account) : "Connect Wallet"}
    </Button>
  );
}
