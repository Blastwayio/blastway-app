import CountDown from "@/containers/Home/components/CountDown";
import Image from "next/image";
import Link from "next/link";
import Arrow from "/public/images/arrow.svg";
import type { CToken } from "@/types";
import assets from "@/config/constants/assets";
import React from "react";

interface LoadingListProps {
  assets: CToken[];
}
const DashBoardLoading: React.FC<LoadingListProps> = () => {
  return (
    <main className="px-4 py-8 sm:px-10 sm:ml-60 sm:align-center">
      <div className="flex flex-col lg:flex-row px-0 md:h-[19rem] xl:h-[26rem] sm:px-4 justify-center items-center space-x-0  space-y-4 lg:space-x-4 lg:space-y-0">
        <div className="relative w-full h-full select-none min-h-48 sm:min-h-64 flex bg-cover bg-banner bg-no-repeat bg-center rounded-xl border border-[#171717] bg-[#0E0E0E] ">
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
            <span className="text-base text-center sm:text-xl text-white/40 py-2">
              Earn protocol fees paid in blue chip assets
            </span>
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-col h-full w-full md:gap-4 xl:gap-12 justify-between sm:w-1/3">
          <div className="bg-[#0E0E0E] rounded-xl border border-[#171717] flex flex-col flex-1 items-center justify-center px-4 py-8 gap-2">
            <div className="mt-2 h-8 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-5/12"></div>
            <div className="h-6 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-9/12"></div>
          </div>
          <div className="bg-[#0E0E0E] rounded-xl border border-[#171717] flex flex-col flex-1 items-center justify-center px-4 py-8 gap-2">
            <div className="mt-2 h-8 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-5/12"></div>
            <div className="h-6 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-9/12"></div>
          </div>
        </div>

        <div className="lg:hidden w-full bg-[#0E0E0E] rounded-xl border border-[#171717]">
          <div className="mt-1 flex w-full justify-between px-4 py-4 items-center border-b border-[#171717]">
            <p className="text-[#6E6E6E] text-md leading-6">Highest Supply APY</p>
            <div className="h-6 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-3/12"></div>
          </div>
          <div className="mt-1 flex w-full justify-between px-4 py-4 items-center">
            <p className="text-[#6E6E6E] text-md leading-6">Lowest Borrow APY</p>
            <div className="h-6 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-3/12"></div>
          </div>
        </div>
      </div>
      <CountDown />
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

          {assets.map((asset, index) => {
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
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  <div className="h-5 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-full max-w-16"></div>
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  <div className="h-5 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-full max-w-16"></div>
                </div>
                <div className="col-span-1 flex flex-col items-center text-center gap-2">
                  <div className="h-[22px] bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-full max-w-32"></div>
                  <div className="h-[18px] bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-full max-w-20"></div>
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
