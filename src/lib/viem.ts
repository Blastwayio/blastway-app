import { CHAIN, CHAIN_ID } from "@/config";
import { RPC_URL } from "@/config/constants/rpcUrls";
import { createPublicClient, http } from "viem";

export const publicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: CHAIN,
  transport: http(RPC_URL),
});
