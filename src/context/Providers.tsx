'use client';

import { Web3Modal } from './Web3Modal';
import ToastProvider from './Toast';
import { State } from 'wagmi';
import { TooltipProvider } from '@/components/ui/tooltip';

interface Props {
  children: React.ReactNode;
  initialState?: State;
}

export default function Providers({ children, initialState }: Props) {
  return (
    <Web3Modal initialState={initialState}>
      <ToastProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ToastProvider>
    </Web3Modal>
  );
}
