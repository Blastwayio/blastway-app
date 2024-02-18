import { StaticImageData } from "next/image";

export interface TokenConfig {
  name: string;
  symbol: string;
  image: StaticImageData;
  address: `0x${string}`;
  decimals: number;
  price?: string;
  apiPriceTokenSymbol?: string;
  apiPriceQuoteTokenSymbol?: string;
}

export interface CTokenConfig extends TokenConfig {
  underlyingToken: TokenConfig;
  canEarnPoints?: "deposit" | "borrow" | "both";
}

export interface Token extends TokenConfig {
  price: string;
}

export interface CToken extends CTokenConfig {
  accrualBlockNumber: string;
  borrowIndex: string;
  exchangeRateStored: string;
  totalReserves: string;
  totalBorrows: string;
  totalCash: string;
  totalSupply: string;
  reserveFactor: string;
  reserveFactorMantissa: string;
  collateralFactor: string;
  collateralFactorMantissa: string;
  supplyRatePerBlock: string;
  borrowRatePerBlock: string;
  exchangeRate: string;
  oneCTokenInUnderlying: string;
  supplyApy: string;
  borrowApy: string;
  isListed: boolean;
  isComped: boolean;
  underlyingToken: Token;
}

export interface SwapParams {
  fromToken: string;
  toToken: string;
  fromAmount: number;
  toAmount: number;
  slippage: number;
  recipient?: string;
  deadline?: number;
}
