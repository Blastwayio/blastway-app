import CountDown from '@/containers/Home/components/CountDown';
import Image from 'next/image';
import Link from 'next/link';
import Arrow from '/public/images/arrow.svg';
import type { CToken } from '@/types';
import assets from '@/config/constants/assets';
import React from 'react';

interface LoadingListProps {
  assets: CToken[];
}

const DashBoardLoading: React.FC<LoadingListProps> = () => {
  return (
    <main className="sm:align-center px-4 py-8 sm:ml-60 sm:px-10">
      <div className="flex flex-col items-center justify-center space-x-0 space-y-4 px-0 sm:px-4 md:h-[19rem] lg:flex-row  lg:space-x-4 lg:space-y-0 xl:h-[26rem]">
        <div className="banner relative h-full w-full overflow-hidden rounded-xl p-0.5">
          <span className="moving-span ">
            <span className="h-w-16 block w-16 " />
          </span>
          <span className="moving-span-2 ">
            <span className="h-w-16 block w-16 " />
          </span>
          <div className="h-full w-full rounded-xl backdrop-blur-3xl">
            <div className="relative flex h-full min-h-48 w-full select-none bg-banner bg-cover bg-center bg-no-repeat sm:min-h-64   ">
              <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
                <span className="text-3xl font-bold text-white sm:text-4xl lg:text-6xl">Unleash the Full</span>
                <span className="text-3xl font-bold text-white sm:text-4xl lg:text-6xl">
                  Power of{' '}
                  <a
                    href="https://blast.io/en"
                    target="_blank"
                    className="bg-gradient-to-r from-[#FFF200] to-[#BDFF00] bg-clip-text text-transparent"
                  >
                    BLAST
                  </a>
                </span>
                <span className="py-2 text-center text-base text-white/80 sm:text-xl">
                  Earn protocol fees paid in blue chip assets
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden h-full w-full justify-between sm:w-1/3 md:gap-4 lg:flex lg:flex-col xl:gap-12">
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-[#171717] bg-[#0E0E0E] px-4 py-8">
            <div className="flex h-8  w-16  animate-pulse items-center gap-2 text-[#FFFFFF]/75 md:text-2xl xl:text-3xl">
              $
            </div>
            <p className="text-center text-base text-[#6E6E6E] xl:text-xl">Total Value Locked</p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-[#171717] bg-[#0E0E0E] px-4 py-8">
            <div className="flex h-8 w-16 animate-pulse items-center gap-2 text-center text-[#FFFFFF]/75 md:text-2xl xl:text-3xl">
              $
            </div>
            <p className="text-base text-[#6E6E6E] xl:text-xl">Total Borrow</p>
          </div>
        </div>

        <div className="w-full rounded-xl border border-[#171717] bg-[#0E0E0E] lg:hidden">
          <div className="flex w-full items-center justify-between border-b border-[#171717] px-4 py-4">
            <p className="text-md text-[#6E6E6E]">Highest Supply APY</p>
            <h1 className="h-7 w-14 animate-pulse text-xl text-[#FFFFFF]/75">%</h1>
          </div>
          <div className="flex w-full items-center justify-between px-4 py-4">
            <p className="text-md text-[#6E6E6E]">Lowest Borrow APY</p>
            <h1 className="h-7 w-14 animate-pulse text-xl text-[#FFFFFF]/75">%</h1>
          </div>
        </div>
      </div>
      <CountDown />
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

          {assets.map((asset, index) => {
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
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <div className="h-5 w-full max-w-16 animate-pulse rounded-full bg-gray-400 bg-opacity-40"></div>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <div className="h-5 w-full max-w-16 animate-pulse rounded-full bg-gray-400 bg-opacity-40"></div>
                </div>
                <div className="col-span-1 flex flex-col items-center gap-2 text-center">
                  <div className="h-[22px] w-full max-w-32 animate-pulse rounded-full bg-gray-400 bg-opacity-40"></div>
                  <div className="h-[18px] w-full max-w-20 animate-pulse rounded-full bg-gray-400 bg-opacity-40"></div>
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
                  <div className="flex justify-end space-x-4"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DashBoardLoading;
