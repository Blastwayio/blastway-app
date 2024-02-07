import React from "react";
import banner from "/public/images/Vector.svg";
import Image from "next/image";

interface BannerStatus {
  statOne: string;
  statTwo: string;
}

interface LendingBannerProps {
  bannerStats: BannerStatus[];
}

const LendingBanner: React.FC<LendingBannerProps> = ({ bannerStats }) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row px-0 sm:px-4 justify-center items-center space-x-0 space-y-4 sm:space-x-4 sm:space-y-0">
        <div className="relative w-full sm:w-3/3">
          <Image src={banner} alt="banner" className="bg-[#0E0E0E] rounded-xl border border-[#171717] w-full" />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <span className="text-2xl sm:text-6xl font-bold text-white">Unleash the Full</span>
            <span className="text-2xl sm:text-6xl font-bold text-white">
              Power of{" "}
              <span className="bg-gradient-to-r from-[#FFF200] to-[#BDFF00] text-transparent bg-clip-text">BLAST</span>
            </span>
            <span className="text-xs sm:text-xl text-white/40 py-2">Earn protocol fees paid in blue chip assets</span>
          </div>
        </div>

        {/*         <div className="hidden sm:block space-y-4 w-full sm:w-1/3">
          <div className="bg-[#0E0E0E] rounded-xl border border-[#171717] text-right pl-16 pr-6 py-8">
            <h1 className="text-[#FFFFFF]/75 text-3xl sm:text-4xl font-bold">{bannerStats[0].statOne}%</h1>
            <p className="text-[#6E6E6E] text-lg sm:text-xl">Max APR on locked dLP</p>
          </div>
          <div className="bg-[#0E0E0E] rounded-xl border border-[#171717] text-right pl-16 pr-6 py-8">
            <h1 className="text-[#FFFFFF]/75 text-3xl sm:text-4xl font-bold">{bannerStats[0].statTwo}%</h1>
            <p className="text-[#6E6E6E] text-lg sm:text-xl">Max APR on locked dLP</p>
          </div>
        </div> */}

        {/*         <div className="sm:hidden w-full bg-[#0E0E0E] rounded-xl border border-[#171717]">
          <div className="flex w-full justify-between px-4 py-4 items-center border-b border-[#171717]">
            <p className="text-[#6E6E6E] text-md">Max APR on locked dLP</p>
            <h1 className="text-[#FFFFFF]/75 text-xl">{bannerStats[0].statOne}%</h1>
          </div>
          <div className="flex w-full justify-between px-4 py-4 items-center">
            <p className="text-[#6E6E6E] text-md">Max APR on locked dLP</p>
            <h1 className="text-[#FFFFFF]/75 text-xl">{bannerStats[0].statTwo}%</h1>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default LendingBanner;
