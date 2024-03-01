import { CTokenConfig } from "@/types";
import { CHAIN_ID } from "..";
import ADDRESSES from "./addresses";
import USDC from "/public/images/tokens/usdc.webp";
import USDT from "/public/images/tokens/usdt.webp";
import WETH from "/public/images/tokens/weth.webp";
import BLUR from "/public/images/tokens/blur.webp";
import BLAST from "/public/images/tokens/blast.webp";
import USDB from "/public/images/tokens/usdb.webp";

const assets: CTokenConfig[] = [
  {
    name: "bWETH",
    symbol: "bWETH",
    image: WETH,
    address: ADDRESSES.ctokens.cWETH[CHAIN_ID] as `0x${string}`,
    decimals: 8,
    underlyingToken: {
      name: "WETH",
      symbol: "WETH",
      image: WETH,
      address: ADDRESSES.WETH[CHAIN_ID] as `0x${string}`,
      decimals: 18,
    },
  },
  {
    name: "bUSDB",
    symbol: "bUSDB",
    image: USDB,
    address: ADDRESSES.ctokens.cUSDB[CHAIN_ID] as `0x${string}`,
    decimals: 8,
    underlyingToken: {
      name: "USDB",
      symbol: "USDB",
      image: USDB,
      address: ADDRESSES.USDB[CHAIN_ID] as `0x${string}`,
      decimals: 18,
      price: "1.00",
    },
  },
].sort((a, b) => a.symbol.localeCompare(b.symbol));

export default assets;
