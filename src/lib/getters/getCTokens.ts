import { CToken } from "@/types";
import { getContract } from "viem";
import CErc20Abi from "@/config/abi/CErc20";
import ComptrollerAbi from "@/config/abi/Comptroller";
import { publicClient } from "@/lib/viem";
import { BLOCK_PER_DAY, CHAIN, CHAIN_ID, DAYS_PER_YEAR } from "@/config";
import axios from "axios";
import assets from "@/config/constants/assets";
import ADDRESSES from "@/config/constants/addresses";

const getCTokens = async () => {
  return await Promise.all(
    assets.map(async ({ address, decimals, name, symbol, image, canEarnPoints, underlyingToken }) => {
      const cErc20Contract = getContract({
        abi: CErc20Abi,
        address,
        client: publicClient,
      });

      const unitrollerContract = getContract({
        abi: ComptrollerAbi,
        address: ADDRESSES.unitroller[CHAIN_ID] as `0x${string}`,
        client: publicClient,
      });
      const [
        accrualBlockNumber,
        borrowIndex,
        borrowRatePerBlock,
        exchangeRateStored,
        totalCash,
        reserveFactorMantissa,
        supplyRatePerBlock,
        totalBorrows,
        totalReserves,
        totalSupply,
        [isListed, collateralFactorMantissa, isComped],
      ] = (await Promise.all([
        cErc20Contract.read.accrualBlockNumber(),
        cErc20Contract.read.borrowIndex(),
        cErc20Contract.read.borrowRatePerBlock(),
        cErc20Contract.read.exchangeRateStored(),
        cErc20Contract.read.getCash(),
        cErc20Contract.read.reserveFactorMantissa(),
        cErc20Contract.read.supplyRatePerBlock(),
        cErc20Contract.read.totalBorrows(),
        cErc20Contract.read.totalReserves(),
        cErc20Contract.read.totalSupply(),
        unitrollerContract.read.markets([address]),
      ])) as any;

      const tokenPriceCall = await axios.get(
        `https://api.dexscreener.com/latest/dex/search?q=${underlyingToken.symbol}%20USDC`
      );

      const underlyingTokenPrice =
        underlyingToken.symbol === "USDC" ||
        underlyingToken.symbol === "USDT" ||
        underlyingToken.symbol === "DAI" ||
        underlyingToken.symbol === "USDB"
          ? "1.00"
          : (
              tokenPriceCall.data.pairs.filter(
                (pair: any) => pair.chainId === CHAIN.name.toLowerCase().split(" ")[0]
              )[0] || tokenPriceCall.data.pairs.filter((pair: any) => pair.dexId === "uniswap")[0]
            ).priceUsd;

      const oneCTokenInUnderlying = Number(exchangeRateStored) / 10 ** (18 + underlyingToken.decimals - decimals);

      // console.log(`1 ${symbol} = ${oneCTokenInUnderlying} ${underlyingToken.symbol}`);

      const supplyApy = (Math.pow((Number(supplyRatePerBlock) / 1e18) * BLOCK_PER_DAY + 1, DAYS_PER_YEAR) - 1) * 100;
      const borrowApy = (Math.pow((Number(borrowRatePerBlock) / 1e18) * BLOCK_PER_DAY + 1, DAYS_PER_YEAR) - 1) * 100;
      // console.log(`Supply APY for ${symbol} is ${supplyApy} %`);
      // console.log(`Borrow APY for ${symbol} is ${borrowApy} %`);

      return {
        accrualBlockNumber: accrualBlockNumber.toString(),
        address,
        borrowIndex: borrowIndex.toString(),
        borrowRatePerBlock: borrowRatePerBlock.toString(),
        decimals,
        exchangeRate: exchangeRateStored.toString(),
        exchangeRateStored: exchangeRateStored.toString(),
        name,
        symbol,
        image,
        totalSupply: totalSupply.toString(),
        totalCash: totalCash.toString(),
        supplyRatePerBlock: supplyRatePerBlock.toString(),
        totalBorrows: totalBorrows.toString(),
        totalReserves: totalReserves.toString(),
        reserveFactor: reserveFactorMantissa.toString(),
        reserveFactorMantissa: reserveFactorMantissa.toString(),
        oneCTokenInUnderlying: oneCTokenInUnderlying.toFixed(6),
        supplyApy: supplyApy.toFixed(2),
        borrowApy: borrowApy.toFixed(2),
        collateralFactorMantissa: collateralFactorMantissa.toString(),
        collateralFactor: (Number(collateralFactorMantissa) / 1e18).toString(),
        isListed,
        isComped,
        canEarnPoints,
        underlyingToken: {
          ...underlyingToken,
          price: underlyingTokenPrice,
        },
      } as CToken;
    })
  );
};

export default getCTokens;
