import React from "react";
import banner from "/public/images/Vector.svg";
import Image from "next/image";
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
      <div className="flex flex-col lg:flex-row px-0 sm:px-4 justify-center items-center space-x-0 space-y-4 lg:space-x-4 lg:space-y-0">
        <div className="relative w-full sm:w-3/3">
          <Image src={banner} alt="banner" className="bg-[#0E0E0E] rounded-xl border border-[#171717] w-full" />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <span className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white">Unleash the Full</span>
            <span className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white">
              Power of{" "}
              <span className="bg-gradient-to-r from-[#FFF200] to-[#BDFF00] text-transparent bg-clip-text">BLAST</span>
            </span>
            <span className="text-xs sm:text-xl text-white/40 py-2">Earn protocol fees paid in blue chip assets</span>
          </div>
        </div>

        <div className="hidden lg:block space-y-4 w-full sm:w-1/3">
          <div className="bg-[#0E0E0E] space-y-3 rounded-xl border border-[#171717] text-right pl-16 px-4 py-8">
            <div className="flex items-center justify-end gap-2 self-end text-[#FFFFFF]/75 text-3xl">
              $1.1Mn
            </div>
            <p className="text-[#6E6E6E] text-lg sm:text-xl">Total Value Locked</p>
          </div>
          <div className="bg-[#0E0E0E] space-y-3 rounded-xl border border-[#171717] text-right pl-16 px-4 py-8">
            <div className="flex items-center justify-end gap-2 self-end text-[#FFFFFF]/75 text-3xl">
              $102.2k
            </div>
            <p className="text-[#6E6E6E] text-lg sm:text-xl">Total Borrow</p>
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
