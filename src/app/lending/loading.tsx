import Link from "next/link";
import Arrow from "/public/images/arrow.svg";
import Image from "next/image";
import { CTokenConfig } from "@/types";
import assets from "@/config/constants/assets";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";

interface LendingTopAssetProps {
  asset: CTokenConfig;
}

const tabs = [
  {
    title: "Supply",
  },
  {
    title: "Withdraw",
  },
  {
    title: "Borrow",
  },
  {
    title: "Repay",
  },
];

const LendingLoading = () => {
  const asset = assets[0];

  return (
    <main className="px-4 py-4 sm:px-10 sm:ml-60 sm:align-center space-y-4">
      <div className="hidden lg:flex w-full gap-20 items-center bg-[#0E0E0E] border border-[#171717] rounded-xl">
        <div className="flex w-full justify-between pr-16 gap-5 mx-auto">
          <div className="flex flex-col items-center py-6 ">
            <p className="text-[#838383] text-md">Asset price</p>
            <div className="h-7 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-3/4"></div>
          </div>

          <div className="flex flex-col items-center py-6 ">
            <p className="text-[#838383] text-md">Borrow APY</p>
            <div className="h-7 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-3/4"></div>
          </div>

          <div className="flex flex-col items-center py-6 ">
            <p className="text-[#838383] text-md">Supply APY</p>
            <div className="h-7 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>

      <div className="lg:hidden space-y-4">
        <div className="flex w-full justify-center gap-8 items-center bg-[#0E0E0E] border border-[#171717] rounded-xl px-2">
          <div className="flex flex-col items-center py-6">
            <p className="text-[#838383] text-xs">Asset price</p>
            <div className="h-6 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-full"></div>
          </div>

          <div className="flex flex-col items-center py-6">
            <p className="text-[#838383] text-xs">Borrow APY</p>
            <div className="h-6 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-full"></div>
          </div>
        </div>
      </div>
      <>
        <div className="flex flex-col sm:flex-row sm:flex-col-2 w-full space-y-4">
          <div className="bg-[#0E0E0E] w-full sm:w-8/12 px-2 sm:px-6 py-4 rounded-xl mx-auto border border-[#171717] flex flex-col">
            <div className="w-full flex justify-between bg-[#161616] py-1.5 px-1 sm:px-1.5 rounded-lg">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`w-1/4 ${
                    !index ? "bg-[#323232]" : "text-[#8A8A8A]"
                  } py-2 rounded text-white text-xs sm:text-sm`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            <>
              <div className="w-full mt-8">
                <div className="flex justify-between">
                  <p className="text-[#C3C3C3] py-2 px-1 text-sm sm:text-md">Supply</p>
                  <div className="flex flex-col items-end py-2 px-1 w-full text-white text-sm sm:text-md">
                    <p>
                      Wallet Balance:{" "}
                      <div className="h-6 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-16"></div>
                      {asset.underlyingToken.symbol}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-8">
                <div className="flex items-center bg-[#0B0B0B] px-2 rounded-lg border border-[#171717] gap-8">
                  <input
                    type="number"
                    placeholder="0.00"
                    className="focus:outline-none py-3 bg-[#0B0B0B] text-white/80124 text-md text-white sm:text-xl w-full"
                  />

                  <div className="flex items-center space-x-2">
                    <button className="flex items-center bg-[#171717] space-x-2 w-20 px-2 py-2 rounded-l-full">
                      <div className="flex items-center gap-1">
                        <Image src={asset.image} alt={asset.underlyingToken.symbol} className="rounded-full h-4" />
                        <span className="text-[#8A8A8A] text-sm">{asset.underlyingToken.symbol}</span>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="bg-[#141414] w-full rounded-lg p-4">
                  <div className="flex justify-between items-center py-2">
                    <p className="text-gray-400 text-md">Wallet Balance</p>
                    <div className="flex gap-2 text-white">
                      <div className="h-6 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-16"></div>
                      {asset.underlyingToken.symbol}
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <p className="text-gray-400 text-md">Amount Supplied</p>
                    <div className="flex gap-2 text-white">
                      <div className="h-6 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-16"></div>{" "}
                      {asset.underlyingToken.symbol}
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <p className="flex gap-2 items-center text-gray-400 text-md">
                      Use as Collateral <InfoIcon className="w-4 h-4" />
                    </p>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-16"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <p className="flex gap-2 items-center text-gray-400 text-md">
                      Collateral Factor <InfoIcon className="w-4 h-4" />
                    </p>
                    <div className="flex gap-2 text-white">
                      <div className="h-6 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-16"></div>%
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <p className="text-gray-400 text-md">Borrow Limit</p>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-16"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <p className="text-gray-400 text-md">Supply APY</p>
                    <div className="flex gap-2 text-white">
                      <div className="h-6 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-16"></div>%
                    </div>
                  </div>
                </div>
              </div>
              <Button className="w-full py-2 mt-8">Supply</Button>
            </>
          </div>
        </div>
      </>
    </main>
  );
};

export default LendingLoading;
