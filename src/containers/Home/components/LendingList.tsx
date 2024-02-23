import React from 'react';
import Arrow from '/public/images/arrow.svg';
import Image from 'next/image';
import Link from 'next/link';
import type { CToken } from '@/types';

interface LendingListProps {
  assets: CToken[];
}

const LendingList: React.FC<LendingListProps> = ({ assets }) => {
  return (
    <div className="container mx-auto mt-8 w-full px-0 sm:px-4">
      <div className="hidden rounded-xl border border-[#232323] bg-[#0e0e0e] shadow-lg lg:grid">
        <div className="grid grid-cols-4 rounded-t-xl border-b border-[#232323] bg-[#141414] px-8 py-6 text-[#848484]">
          <div className="justify-left flex items-center space-x-1">
            <span>Assets</span>
            <Image src={Arrow} alt="arrow" />
          </div>
          <div className="flex items-center justify-center space-x-1">
            <span>Deposit %</span>
            <Image src={Arrow} alt="arrow" />
          </div>
          <div className="flex items-center justify-center space-x-1">
            <span>Borrow %</span>
            <Image src={Arrow} alt="arrow" />
          </div>
          <div className="flex items-center justify-center space-x-1">
            <span>Liquidity</span>
            <Image src={Arrow} alt="arrow" />
          </div>
        </div>

        {assets
          .sort((a, b) => a.symbol.localeCompare(b.symbol))
          .map((asset, index) => {
            const totalLiquidityFormatted = new Intl.NumberFormat('en-US', {
              notation: 'compact',
              compactDisplay: 'short',
              maximumFractionDigits: 2,
            }).format(+asset.totalCash / 10 ** asset.underlyingToken.decimals);

            const totalLiquidityPriceFormatted = new Intl.NumberFormat('en-US', {
              notation: 'compact',
              compactDisplay: 'short',
              maximumFractionDigits: 2,
            }).format((+asset.totalCash / 10 ** asset.underlyingToken.decimals) * +asset.underlyingToken.price);

            return (
              <Link
                href={`/lending?asset=${asset.underlyingToken.symbol}`}
                key={index}
                className="grid grid-cols-4 items-center border-b border-[#232323] px-2 py-4 text-sm text-white transition-colors duration-300 hover:bg-[#141414]"
              >
                <div className="col-span-1 items-center text-center">
                  <div className="ml-6 flex items-center gap-3 text-left">
                    <Image
                      src={asset.image}
                      alt={asset.underlyingToken.symbol}
                      className="h-[38px] w-[38px] select-none"
                      draggable={false}
                    />
                    <div>
                      <p className="text-md">{asset.underlyingToken.symbol}</p>
                      {/*                     <p className="text-[#848484] text-sm">Deposited: {0}</p>
                    <p className="text-[#848484] text-sm">Borrowed: {0}</p> */}
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center text-center">
                  <p className="text-lg">%{asset.supplyApy}</p>
                  {asset.canEarnPoints === 'deposit' ? (
                    <p className="text-[12px} rounded-full bg-red-800 px-3 py-1 text-center">+2x POINTS</p>
                  ) : (
                    <p className="text-[12px} rounded-full bg-lime-400 px-3 py-1 text-center text-black">+POINTS</p>
                  )}
                </div>
                <div className="col-span-1 flex flex-col items-center text-center">
                  <p className="text-lg">%{asset.borrowApy}</p>
                  {asset.canEarnPoints === 'borrow' ? (
                    <p className="rounded-full bg-red-800 px-3 py-1 text-center text-[12px]">+2x POINTS</p>
                  ) : (
                    <p className="text-[12px} rounded-full bg-lime-400 px-3 py-1 text-center text-black">+POINTS</p>
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
        <div className="w-full border-b border-[#2E2F31] py-4 text-gray-200">
          <p className="text-md px-5">Assets to Supply & Borrow</p>
        </div>

        {assets.map((asset, index) => (
          <Link
            href={`/lending?asset=${asset.name}`}
            key={index}
            className="items-center border-b border-[#232323] py-4 text-sm text-white transition-colors duration-300 hover:bg-[#141414]"
          >
            <div className="col-span-1 items-center px-2 text-center">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <Image src={asset.image} alt={asset.name} style={{ width: '38px', height: '38px' }} />
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
