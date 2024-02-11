import { CHAIN_ID } from "..";

export const RPC_URLS = {
  1: "https://eth-mainnet.public.blastapi.io", // ETH Mainnet
  3: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // Ropsten Testnet (ETH)
  4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // Rinkeby Testnet (ETH)
  5: "https://eth-goerli.public.blastapi.io", // Görli Testnet (ETH)
  10: "https://optimism-mainnet.infura.io", // Optimism Mainnet
  //  42: "", // Kovan Testnet (ETH)
  56: "https://bsc-dataseed.binance.org", // BSC Mainnet
  97: "https://data-seed-prebsc-1-s1.binance.org:8545", // BSC Testnet
  137: "https://polygon-rpc.com/", // Polygon Mainnet
  324: "https://mainnet.era.zksync.io", // ZKSync Mainnet
  420: "https://goerli.optimism.io", // Optimism Goerli Testnet
  42161: "https://arbitrum-mainnet.infura.io", // Arbitrum Mainnet
  43114: "https://avalanche-mainnet.infura.io", // AVAX Mainnet
  80001: "https://matic-mumbai.chainstacklabs.com", // Polygon Testnet (Polygon)
  168587773: "https://sepolia.blast.io", // Sepolia Testnet (Blast)
};

export const RPC_URL = RPC_URLS[CHAIN_ID];
