"use client";

import { Web3Modal } from "./Web3Modal";
import ToastProvider from "./Toast";
import { State } from "wagmi";

interface Props {
  children: React.ReactNode;
  initialState?: State;
}

export default function Providers({ children, initialState }: Props) {
  return (
    <Web3Modal initialState={initialState}>
      <ToastProvider>{children}</ToastProvider>
    </Web3Modal>
  );
}
