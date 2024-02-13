import { CHAIN, CHAIN_ID } from "@/config";
import { createPublicClient, http } from "viem";

export const publicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: CHAIN,
  transport: http(process.env.RPC_URL),
});
