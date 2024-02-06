"use client";

import type { CToken } from "@/types";
import Link from "next/link";
import ActionButton from "./ActionButton";
import { useUserData } from "@/hooks/useUserData";
import ASSETS from "@/config/constants/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  cTokens: CToken[];
}

const LendBorrow = ({ cTokens }: Props) => {
  const userData = useUserData(cTokens);

  const assets = cTokens.map((cToken) => {
    const foundUserTokenData = userData.tokenData?.find((userTokenData) => userTokenData.address === cToken.address);

    const totalLiquidityFormatted = new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(+cToken.totalCash / 10 ** cToken.underlyingToken.decimals);

    const totalLiquidityPriceFormatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format((+cToken.totalCash / 10 ** cToken.underlyingToken.decimals) * +cToken.underlyingToken.price);

    const totalBalanceFormatted = new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(parseInt(foundUserTokenData?.underlyingBalance || "0"));

    const totalBalancePriceFormatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(parseInt(foundUserTokenData?.underlyingBalance || "0") * +cToken.underlyingToken.price);

    const suppliedBalanceFormatted = new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(parseInt(foundUserTokenData?.supplyBalance || "0"));

    const suppliedBalancePriceFormatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(parseInt(foundUserTokenData?.supplyBalance || "0") * +cToken.underlyingToken.price);

    const borrowedBalanceFormatted = new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(parseInt(foundUserTokenData?.borrowBalance || "0"));

    const borrowedBalancePriceFormatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(parseInt(foundUserTokenData?.borrowBalance || "0") * +cToken.underlyingToken.price);
    return (
      <div
        key={cToken.underlyingToken.symbol}
        className="grid grid-cols-8 py-4 px-2 text-sm text-white items-center border-b border-[#2E2F31] hover:bg-[#121417] transition-colors duration-300"
      >
        <div className="col-span-1 items-center text-center">
          <div className="flex gap-3 items-center text-left ml-6">
            <Image
              src={`/assets/tokens/${cToken.underlyingToken.symbol.toLowerCase()}.png`}
              width="32"
              height="32"
              alt={cToken.underlyingToken.symbol}
            />
            <div>
              <p>{cToken.underlyingToken.symbol}</p>
              <p>{cToken.underlyingToken.price}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1 items-center text-center">
          <p>
            {totalBalanceFormatted} {cToken?.underlyingToken.symbol}
          </p>
          <p>{totalBalancePriceFormatted}</p>
        </div>
        <div className="col-span-1 items-center text-center">
          <p>{cToken.supplyApy}%</p>
        </div>
        <div className="col-span-1 items-center text-center">
          <p>
            {suppliedBalanceFormatted} {cToken?.underlyingToken.symbol}
          </p>
          <p>{suppliedBalancePriceFormatted}</p>
        </div>
        <div className="col-span-1 items-center text-center">
          <p>{cToken.borrowApy}%</p>
        </div>
        <div className="col-span-1 items-center text-center">
          <p>
            {borrowedBalanceFormatted} {cToken?.underlyingToken.symbol}
          </p>
          <p>{borrowedBalancePriceFormatted}</p>
        </div>
        <div className="col-span-1 items-center text-center">
          <p>{totalLiquidityPriceFormatted}</p>
          <p>
            {totalLiquidityFormatted} {cToken.underlyingToken.symbol}
          </p>
        </div>
        <div className="col-span-1 items-center text-center">
          <ActionButton cToken={cToken} userData={userData} />
        </div>
      </div>
    );
  });

  const assetsMobile = cTokens.map((cToken) => {
    return (
      <Link key={cToken.underlyingToken.symbol} href="/token/ETH" passHref className="py-4">
        <div className="col-span-1 items-center text-center text-white">
          <div className="flex gap-3 items-center text-left ml-6">
            <img
              src="https://app.eralend.com/_next/static/media/ETH-logo.cda4f2bf.svg"
              width="22"
              height="22"
              alt="ETH"
            />
            <div>
              <p>ETH</p>
              <p>$2.470K</p>
            </div>
          </div>

          <div className="py-4 px-5 space-y-3 border-b border-[#2E2F31]">
            <div className="flex justify-between items-center text-gray-300">
              <div>Wallet:</div>
              <div className="col-span-1 items-center text-right">
                <p>0.0</p>
                <p>$0.00</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <div>Supply APY:</div>
              <div className="col-span-1 items-center text-center">
                <p>0.11%</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <div>Supplied:</div>
              <div className="col-span-1 items-center text-right">
                <p>0.0</p>
                <p>$0.00</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <div>Borrow APY:</div>
              <div className="col-span-1 items-center text-center">
                <p>2.13%</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <div>Borrowed:</div>
              <div className="col-span-1 items-center text-right">
                <p>0.0</p>
                <p>$0.00</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <div>Liqudity:</div>
              <div className="col-span-1 items-center text-right">
                <p>$ 1.931M</p>
                <p>782.00 ETH</p>
              </div>
            </div>
            <ActionButton cToken={cToken} userData={userData} />
          </div>
        </div>
      </Link>
    );
  });

  return (
    <>
      <div className="mt-8 px-0 sm:px-4 w-full container mx-auto">
        <div className="hidden sm:grid bg-[#1E2022] border border-[#2E2F31] rounded-2xl shadow-lg">
          <div className="grid grid-cols-8 py-6 px-2 text-white border-b border-[#2E2F31]">
            <div className="text-center">Asset</div>
            <div className="text-center">Wallet Balance</div>
            <div className="text-center">Supply APY</div>
            <div className="text-center">Supplied</div>
            <div className="text-center">Borrow APY</div>
            <div className="text-center">Borrowed</div>
            <div className="text-center">Liquidity</div>
            <div className="text-center">Action</div>
          </div>

          {assets}

          <div className="py-2"></div>
        </div>

        <div className="flex flex-col sm:hidden">
          <div className="text-gray-200 border-b border-[#2E2F31] w-full py-4">
            <p className="px-5 text-md">Assets to Supply & Borrow</p>
          </div>

          {assetsMobile}
        </div>
      </div>
    </>
  );
};

export const LendBorrowSkeleton = () => {
  const assets = ASSETS.map((asset) => {
    return (
      <div
        key={asset.symbol}
        className="grid grid-cols-8 py-4 px-2 text-sm text-white items-center border-b border-[#2E2F31] hover:bg-[#121417] transition-colors duration-300"
      >
        <div className="col-span-1 items-center text-center">
          <div className="flex gap-3 items-center text-left ml-6">
            <img
              src={`/assets/tokens/${asset.underlyingToken.symbol.toLowerCase()}.png`}
              width="32"
              height="32"
              alt={asset.symbol}
            />
            <div>
              <p>{asset.symbol}</p>
              <p>${0}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1 items-center text-center">
          <p>0.0</p>
          <p>$0.00</p>
        </div>
        <div className="col-span-1 items-center text-center">
          <p>0.00%</p>
        </div>
        <div className="col-span-1 items-center text-center">
          <p>0.0</p>
          <p>$0.00</p>
        </div>
        <div className="col-span-1 items-center text-center">
          <p>0.00%</p>
        </div>
        <div className="col-span-1 items-center text-center">
          <p>0.0</p>
          <p>$0.00</p>
        </div>
        <div className="col-span-1 items-center text-center">
          <p>$ 0.00</p>
          <p>0.00 {asset.symbol}</p>
        </div>
        <div className="col-span-1 items-center text-center">
          <Button className="bg-[#3730AD] rounded-full text-white px-4 py-2 hover:from-red-600 hover:to-orange-600 transition-colors duration-300">
            Manage
          </Button>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="mt-8 px-0 sm:px-4 w-full container mx-auto">
        <div className="hidden sm:grid bg-[#1E2022] border border-[#2E2F31] rounded-2xl shadow-lg">
          <div className="grid grid-cols-8 py-6 px-2 text-white border-b border-[#2E2F31]">
            <div className="text-center">Asset</div>
            <div className="text-center">Wallet Balance</div>
            <div className="text-center">Supply APY</div>
            <div className="text-center">Supplied</div>
            <div className="text-center">Borrow APY</div>
            <div className="text-center">Borrowed</div>
            <div className="text-center">Liquidity</div>
            <div className="text-center">Action</div>
          </div>

          {assets}

          <div className="py-2"></div>
        </div>

        <div className="flex flex-col sm:hidden">
          <div className="text-gray-200 border-b border-[#2E2F31] w-full py-4">
            <p className="px-5 text-md">Assets to Supply & Borrow</p>
          </div>

          <Link href="/token/ETH" passHref className="py-4">
            <div className="col-span-1 items-center text-center text-white">
              <div className="flex gap-3 items-center text-left ml-6">
                <img
                  src="https://app.eralend.com/_next/static/media/ETH-logo.cda4f2bf.svg"
                  width="22"
                  height="22"
                  alt="ETH"
                />
                <div>
                  <p>ETH</p>
                  <p>$2.470K</p>
                </div>
              </div>

              <div className="py-4 px-5 space-y-3 border-b border-[#2E2F31]">
                <div className="flex justify-between items-center text-gray-300">
                  <div>Wallet:</div>
                  <div className="col-span-1 items-center text-right">
                    <p>0.0</p>
                    <p>$0.00</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <div>Supply APY:</div>
                  <div className="col-span-1 items-center text-center">
                    <p>0.11%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <div>Supplied:</div>
                  <div className="col-span-1 items-center text-right">
                    <p>0.0</p>
                    <p>$0.00</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <div>Borrow APY:</div>
                  <div className="col-span-1 items-center text-center">
                    <p>2.13%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <div>Borrowed:</div>
                  <div className="col-span-1 items-center text-right">
                    <p>0.0</p>
                    <p>$0.00</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <div>Liqudity:</div>
                  <div className="col-span-1 items-center text-right">
                    <p>$ 1.931M</p>
                    <p>782.00 ETH</p>
                  </div>
                </div>
                <Link
                  href="/token/ETH"
                  passHref
                  className="bg-[#3730AD] w-full rounded-full text-white px-4 py-3 hover:from-red-600 hover:to-orange-600 transition-colors duration-300"
                >
                  Action
                </Link>
              </div>
            </div>
          </Link>

          <Link href="/token/USDC" passHref className="py-4">
            <div className="col-span-1  items-center text-center text-white">
              <div className="flex gap-3 items-center text-left ml-6">
                <img
                  src="https://app.eralend.com/_next/static/media/USDC-logo.74c6aa75.svg"
                  width="24"
                  height="24"
                  alt="USDC"
                />
                <div>
                  <p>USDC</p>
                  <p>$1.00</p>
                </div>
              </div>

              <div className="py-4 px-5 space-y-3 border-b border-[#2E2F31]">
                <div className="flex justify-between items-center text-gray-300">
                  <div>Wallet:</div>
                  <div className="col-span-1 items-center text-right">
                    <p>0.0</p>
                    <p>$0.00</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <div>Supply APY:</div>
                  <div className="col-span-1 items-center text-center">
                    <p>0.54%</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <div>Supplied:</div>
                  <div className="col-span-1 items-center text-right">
                    <p>0.0</p>
                    <p>$0.00</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <div>Borrow APY:</div>
                  <div className="col-span-1 items-center text-center">
                    <p>4.63%</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <div>Borrowed:</div>
                  <div className="col-span-1 items-center text-right">
                    <p>0.0</p>
                    <p>$0.00</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <div>Liqudity:</div>
                  <div className="col-span-1 items-center text-right">
                    <p>$ 582.6K</p>
                    <p>582.6K USDC</p>
                  </div>
                </div>

                <Link
                  href="/token/USDC"
                  passHref
                  className="bg-[#3730AD] w-full rounded-full text-white px-4 py-3 hover:from-red-600 hover:to-orange-600 transition-colors duration-300"
                >
                  Action
                </Link>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LendBorrow;
