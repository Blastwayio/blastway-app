'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Button } from './ui/button';
import { useAccount, useAccountEffect, useSwitchChain } from 'wagmi';
import { formatAddress } from '@/lib/utils';
import { CHAIN_ID } from '@/config';

interface Props {
  className?: string;
}

export default function ConnectButton({ className }: Props) {
  const { open } = useWeb3Modal();
  const { address: account, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  useAccountEffect({
    onConnect: async () => {
      if (chainId !== CHAIN_ID) {
        await switchChainAsync({ chainId: CHAIN_ID });
      }
      console.log('connected!');
    },
  });

  return (
    <Button className={`mx-auto mb-4 w-[80%] text-black ${className}`} onClick={() => open()}>
      {account ? formatAddress(account) : 'Connect Wallet'}
    </Button>
  );
}
