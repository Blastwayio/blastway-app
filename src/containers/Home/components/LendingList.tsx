import React from "react";
import Arrow from "/public/images/arrow.svg";
import Image from "next/image";
import Link from "next/link";
import type { CToken } from "@/types";

interface LendingListProps {
  assets: CToken[];
}

const LendingList: React.FC<LendingListProps> = ({ assets }) => {
  return (
    <div className="mt-8 px-0 sm:px-4 w-full container mx-auto">
      <div className="hidden lg:grid bg-[#0e0e0e] border border-[#232323] rounded-xl shadow-lg">
        <div className="bg-[#141414] text-[#848484] border-b border-[#232323] rounded-t-xl grid grid-cols-4 py-6 px-8">
          <div className="flex justify-left items-center space-x-1">
            <span>Assets</span>
            <Image src={Arrow} alt="arrow" />
          </div>
          <div className="flex justify-center items-center space-x-1">
            <span>Deposit %</span>
            <Image src={Arrow} alt="arrow" />
          </div>
          <div className="flex justify-center items-center space-x-1">
            <span>Borrow %</span>
            <Image src={Arrow} alt="arrow" />
          </div>
          <div className="flex justify-center items-center space-x-1">
            <span>Liquidity</span>
            <Image src={Arrow} alt="arrow" />
          </div>
        </div>

        {assets
          .sort((a, b) => a.symbol.localeCompare(b.symbol))
          .map((asset, index) => {
            const totalLiquidityFormatted = new Intl.NumberFormat("en-US", {
              notation: "compact",
              compactDisplay: "short",
              maximumFractionDigits: 2,
            }).format(+asset.totalCash / 10 ** asset.underlyingToken.decimals);

            const totalLiquidityPriceFormatted = new Intl.NumberFormat("en-US", {
              notation: "compact",
              compactDisplay: "short",
              maximumFractionDigits: 2,
            }).format((+asset.totalCash / 10 ** asset.underlyingToken.decimals) * +asset.underlyingToken.price);

            return (
              <Link
                href={`/lending?asset=${asset.underlyingToken.symbol}`}
                key={index}
                className="grid grid-cols-4 py-4 px-2 text-sm text-white items-center border-b border-[#232323] hover:bg-[#141414] transition-colors duration-300"
              >
                <div className="col-span-1 items-center text-center">
                  <div className="flex gap-3 items-center text-left ml-6">
                    <Image
                      src={asset.image}
                      alt={asset.underlyingToken.symbol}
                      className="select-none w-[38px] h-[38px]"
                      draggable={false}
                    />
                    <div>
                      <p className="text-md">{asset.underlyingToken.symbol}</p>
                      {/*                     <p className="text-[#848484] text-sm">Deposited: {0}</p>
                    <p className="text-[#848484] text-sm">Borrowed: {0}</p> */}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col col-span-1 items-center text-center">
                  <p className="text-lg">%{asset.supplyApy}</p>
                  {asset.canEarnPoints === "deposit" ? (
                    <p className="py-1 px-3 rounded-full text-center bg-red-800 text-[12px}">+2x POINTS</p>
                  ) : (
                    <p className="py-1 px-3 rounded-full text-center text-black bg-lime-400 text-[12px}">+POINTS</p>
                  )}
                </div>
                <div className="flex flex-col col-span-1 items-center text-center">
                  <p className="text-lg">%{asset.borrowApy}</p>
                  {asset.canEarnPoints === "borrow" ? (
                    <p className="py-1 px-3 rounded-full text-center bg-red-800 text-[12px]">+2x POINTS</p>
                  ) : (
                    <p className="py-1 px-3 rounded-full text-center text-black bg-lime-400 text-[12px}">+POINTS</p>
                  )}
                </div>
                <div className="col-span-1 items-center text-center">
                  <p className="text-lg">
                    {totalLiquidityFormatted} {asset.underlyingToken.symbol}
                  </p>
                  <p>~{totalLiquidityPriceFormatted}$</p>
                </div>
              </Link>
            );
          })}
      </div>

      <div className="flex flex-col lg:hidden">
        <div className="text-gray-200 border-b border-[#2E2F31] w-full py-4">
          <p className="px-5 text-md">Assets to Supply & Borrow</p>
        </div>

        {assets.map((asset, index) => (
          <Link
            href={`/lending?asset=${asset.name}`}
            key={index}
            className="py-4 text-sm text-white items-center border-b border-[#232323] hover:bg-[#141414] transition-colors duration-300"
          >
            <div className="col-span-1 items-center text-center px-2">
              <div className="flex gap-3 items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Image src={asset.image} alt={asset.name} style={{ width: "38px", height: "38px" }} />
                  <p className="text-md">{asset.name}</p>
                </div>
                <div className="flex justify-end space-x-4">
                  {/*  <p className="text-[#848484] text-sm">Deposited: {0}</p>
                  <p className="text-[#848484] text-sm">Borrowed: {0}</p> */}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LendingList;
