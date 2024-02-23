import React from 'react';
import { CToken } from '@/types';

interface LendingBannerProps {
  assets: CToken[];
}

const LendingBanner: React.FC<LendingBannerProps> = ({ assets }) => {
  const maxSupplyApyToken = assets.sort((a, b) => +b.supplyApy - +a.supplyApy)[0];
  const minBorrowApyToken = assets.sort((a, b) => +a.borrowApy - +b.borrowApy)[0];
  return (
    <>
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
            <div className="flex items-center  gap-2  text-[#FFFFFF]/75 md:text-2xl xl:text-3xl">$1.1Mn</div>
            <p className="text-center text-base text-[#6E6E6E] xl:text-xl">Total Value Locked</p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-[#171717] bg-[#0E0E0E] px-4 py-8">
            <div className="flex items-center gap-2 text-center text-[#FFFFFF]/75 md:text-2xl xl:text-3xl">$102.2k</div>
            <p className="text-base text-[#6E6E6E] xl:text-xl">Total Borrow</p>
          </div>
        </div>

        <div className="w-full rounded-xl border border-[#171717] bg-[#0E0E0E] lg:hidden">
          <div className="flex w-full items-center justify-between border-b border-[#171717] px-4 py-4">
            <p className="text-md text-[#6E6E6E]">Highest Supply APY</p>
            <h1 className="text-xl text-[#FFFFFF]/75">{maxSupplyApyToken.supplyApy}%</h1>
          </div>
          <div className="flex w-full items-center justify-between px-4 py-4">
            <p className="text-md text-[#6E6E6E]">Lowest Borrow APY</p>
            <h1 className="text-xl text-[#FFFFFF]/75">{minBorrowApyToken.supplyApy}%</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default LendingBanner;
