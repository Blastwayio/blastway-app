import { CTokenConfig } from "@/types";
import { CHAIN_ID } from "..";
import ADDRESSES from "./addresses";
import USDC from "/public/images/tokens/usdc.svg";
import USDT from "/public/images/tokens/usdt.svg";
import ETH from "/public/images/tokens/eth.svg";
import BLUR from "/public/images/tokens/blur.webp";
import BLAST from "/public/images/tokens/blast.png";

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
  {
    name: "bWETH",
    symbol: "bWETH",
    image: ETH,
    address: ADDRESSES.ctokens.cWETH[CHAIN_ID] as `0x${string}`,
    decimals: 8,
    canEarnPoints: "borrow" as "deposit" | "borrow" | "both",
    underlyingToken: {
      name: "WETH",
      symbol: "WETH",
      image: ETH,
      address: ADDRESSES.TestWETH[CHAIN_ID] as `0x${string}`,
      decimals: 18,
    },
  },
  {
    name: "bBLUR",
    symbol: "bBLUR",
    image: BLUR,
    address: ADDRESSES.ctokens.cBLUR[CHAIN_ID] as `0x${string}`,
    decimals: 8,
    underlyingToken: {
      name: "BLUR",
      symbol: "BLUR",
      image: BLUR,
      address: ADDRESSES.TestBLUR[CHAIN_ID] as `0x${string}`,
      decimals: 18,
    },
  },
  {
    name: "bUSDT",
    symbol: "bUSDT",
    image: USDT,
    address: ADDRESSES.ctokens.cUSDT[CHAIN_ID] as `0x${string}`,
    decimals: 8,
    underlyingToken: {
      name: "USDT",
      symbol: "USDT",
      image: USDT,
      address: ADDRESSES.TestUSDT[CHAIN_ID] as `0x${string}`,
      decimals: 18,
    },
  },
  {
    name: "bBLAST",
    symbol: "bBLAST",
    image: BLAST,
    address: ADDRESSES.ctokens.cBLAST[CHAIN_ID] as `0x${string}`,
    decimals: 8,
    canEarnPoints: "borrow" as "deposit" | "borrow" | "both",
    underlyingToken: {
      name: "BLAST",
      symbol: "BLAST",
      image: BLAST,
      address: ADDRESSES.TestBLAST[CHAIN_ID] as `0x${string}`,
      decimals: 18,
    },
  },
].sort((a, b) => a.symbol.localeCompare(b.symbol));

export default assets;
