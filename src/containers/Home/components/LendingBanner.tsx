import React from "react";
import { CToken } from "@/types";

interface BannerStatus {
  statOne: string;
  statTwo: string;
}

interface LendingBannerProps {
  bannerStats: BannerStatus[];
  assets: CToken[];
}

const LendingBanner: React.FC<LendingBannerProps> = ({ bannerStats, assets }) => {
  const maxSupplyApyToken = assets.sort((a, b) => +b.supplyApy - +a.supplyApy)[0];
  const minBorrowApyToken = assets.sort((a, b) => +a.borrowApy - +b.borrowApy)[0];
  return (
    <>
      <div className="flex flex-col lg:flex-row px-0 md:h-[19rem] xl:h-[26rem] sm:px-4 justify-center items-center space-x-0  space-y-4 lg:space-x-4 lg:space-y-0">
        <div className="p-0.5 w-full h-full banner relative rounded-xl overflow-hidden">
          <span className="moving-span ">
            <span className="block w-16 h-w-16 "></span>
          </span>
          <span className="moving-span-2 ">
            <span className="block w-16 h-w-16 "></span>
          </span>
          <div className="w-full h-full backdrop-blur-3xl rounded-xl">
            <div className="relative w-full h-full select-none min-h-48 sm:min-h-64 flex bg-cover bg-banner bg-no-repeat bg-center   ">
              {/* <Image
            src={banner}
            alt="banner"
            className="bg-[#0E0E0E] rounded-xl border border-[#171717] w-full bg-cover"
            draggable="false"
          /> */}
              <div className="absolute inset-0 flex flex-col justify-center items-center px-2">
                <span className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white">Unleash the Full</span>
                <span className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white">
                  Power of{" "}
                  <a
                    href="https://blast.io/en"
                    target="_blank"
                    className="bg-gradient-to-r from-[#FFF200] to-[#BDFF00] text-transparent bg-clip-text"
                  >
                    BLAST
                  </a>
                </span>
                <span className="text-base text-center sm:text-xl text-white/80 py-2">
                  Earn protocol fees paid in blue chip assets
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-col h-full w-full md:gap-4 xl:gap-12 justify-between sm:w-1/3">
          <div className="bg-[#0E0E0E] rounded-xl border border-[#171717] flex flex-col flex-1 items-center justify-center px-4 py-8">
            <div className="flex items-center  gap-2  text-[#FFFFFF]/75 md:text-2xl xl:text-3xl">$1.1Mn</div>
            <p className="text-[#6E6E6E] text-center text-base xl:text-xl">Total Value Locked</p>
          </div>
          <div className="bg-[#0E0E0E] rounded-xl border border-[#171717] flex flex-col flex-1 items-center justify-center px-4 py-8">
            <div className="flex items-center gap-2 text-center text-[#FFFFFF]/75 md:text-2xl xl:text-3xl">$102.2k</div>
            <p className="text-[#6E6E6E] text-base xl:text-xl">Total Borrow</p>
          </div>
        </div>

        <div className="lg:hidden w-full bg-[#0E0E0E] rounded-xl border border-[#171717]">
          <div className="flex w-full justify-between px-4 py-4 items-center border-b border-[#171717]">
            <p className="text-[#6E6E6E] text-md">Highest Supply APY</p>
            <h1 className="text-[#FFFFFF]/75 text-xl">{maxSupplyApyToken.supplyApy}%</h1>
          </div>
          <div className="flex w-full justify-between px-4 py-4 items-center">
            <p className="text-[#6E6E6E] text-md">Lowest Borrow APY</p>
            <h1 className="text-[#FFFFFF]/75 text-xl">{minBorrowApyToken.supplyApy}%</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default LendingBanner;
