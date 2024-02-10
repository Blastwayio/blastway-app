import { zkSync, zkSyncSepoliaTestnet, mainnet, goerli, optimism, optimismGoerli, blastSepolia } from "viem/chains";

/* 
10: optimism
324: zksync
*/
export const CHAIN_ID = 168587773;

const CHAINS = [mainnet, goerli, optimism, optimismGoerli, zkSync, zkSyncSepoliaTestnet, blastSepolia];
export const CHAIN = CHAINS.find((chain) => +chain.id === CHAIN_ID)!;

export const BLOCK_PER_SECOND = 2;
export const BLOCK_PER_MINUTE = BLOCK_PER_SECOND * 60;
export const BLOCK_PER_HOUR = BLOCK_PER_MINUTE * 60;
export const BLOCK_PER_DAY = BLOCK_PER_HOUR * 24;
export const BLOCK_PER_WEEK = BLOCK_PER_DAY * 7;
export const BLOCK_PER_MONTH = BLOCK_PER_DAY * 30;
export const BLOCK_PER_YEAR = BLOCK_PER_DAY * 365;

export const DAYS_PER_YEAR = 365;
