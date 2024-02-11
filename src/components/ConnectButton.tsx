"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "./ui/button";
import { useAccount, useAccountEffect, useSwitchChain } from "wagmi";
import { formatAddress } from "@/lib/utils";
import { CHAIN_ID } from "@/config";

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const { address: account, chainId } = useAccount();
  const { chains, switchChainAsync } = useSwitchChain();

  console.log("chainId", chainId);

  useAccountEffect({
    onConnect: async () => {
      if (chainId !== CHAIN_ID) {
        await switchChainAsync({ chainId: CHAIN_ID });
      }
      console.log("connected!");
    },
  });

  return (
    <Button className="w-[80%] mb-4 mx-auto" onClick={() => open()}>
      {account ? formatAddress(account) : "Connect Wallet"}
    </Button>
  );
}
