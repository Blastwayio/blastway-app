import ADDRESSES from "./config/constants/addresses";

export interface TokenConfig {
  name: string;
  symbol: string;
  image: string;
  address: `0x${string}`;
  decimals: number;
}

export interface CTokenConfig extends TokenConfig {
  underlyingToken: TokenConfig;
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
