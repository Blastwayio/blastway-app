import { CTokenConfig } from "@/types";
import { CHAIN_ID } from "..";
import ADDRESSES from "./addresses";
import USDC from "/public/images/tokens/usdc.svg";
import USDT from "/public/images/tokens/usdt.svg";
import ETH from "/public/images/tokens/eth.svg";

const assets: CTokenConfig[] = [
  {
    name: "bUSDC",
    symbol: "bUSDC",
    image: USDC,
    address: ADDRESSES.ctokens.cUSDC[CHAIN_ID] as `0x${string}`,
    decimals: 8,
    underlyingToken: {
      name: "USDC",
      symbol: "USDC",
      image: USDC,
      address: ADDRESSES.TestUSDC[CHAIN_ID] as `0x${string}`,
      decimals: 18,
    },
  },
  /*   {
    name: "cUSDT",
    symbol: "cUSDT",
    image: USDT,
    address: ADDRESSES.ctokens.cUSDT[CHAIN_ID] as `0x${string}`,
    decimals: 8,
    underlyingToken: {
      name: "USDT",
      symbol: "USDT",
      image: USDT,
      address: ADDRESSES.USDT[CHAIN_ID] as `0x${string}`,
      decimals: 6,
    },
  }, */
  {
    name: "bWETH",
    symbol: "bWETH",
    image: ETH,
    address: ADDRESSES.ctokens.cWETH[CHAIN_ID] as `0x${string}`,
    decimals: 8,
    underlyingToken: {
      name: "WETH",
      symbol: "WETH",
      image: ETH,
      address: ADDRESSES.TestWETH[CHAIN_ID] as `0x${string}`,
      decimals: 18,
    },
  },
];

export default assets;
