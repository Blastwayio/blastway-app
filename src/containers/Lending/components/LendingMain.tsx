"use client";
import React, { useState, useEffect } from "react";
import Arrow from "/public/images/arrow.svg";
import USDC from "/public/images/tokens/usdc.svg";
import Distribution from "/public/images/distribution.svg";
import I from "/public/images/i.svg";
import Image from "next/image";
import type { CToken } from "@/types";
import { Button } from "@/components/ui/button";

interface LendingMainProps {
  asset: CToken;
}

const LendingMain: React.FC<LendingMainProps> = ({ asset }) => {
  const [tab, setTab] = useState("supply");

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:flex-col-2 w-full space-y-4">
        <div className="bg-[#0E0E0E] w-full sm:w-8/12 px-2 sm:px-6 py-4 rounded-xl border border-[#171717]">
          <div className="w-full flex justify-between bg-[#161616] py-1.5 px-1 sm:px-1.5 rounded-lg">
            <button
              className={`w-1/4 ${
                tab === "supply" ? "bg-[#323232]" : "text-[#8A8A8A]"
              } py-2 rounded text-white text-xs sm:text-sm`}
              onClick={() => setTab("supply")}
            >
              Supply
            </button>
            <button
              className={`w-1/4 ${
                tab === "withdraw" ? "bg-[#323232]" : "text-[#8A8A8A]"
              } py-2 rounded text-white text-xs sm:text-sm`}
              onClick={() => setTab("withdraw")}
            >
              Withdraw
            </button>
            <button
              className={`w-1/4 ${
                tab === "borrow" ? "bg-[#323232]" : "text-[#8A8A8A]"
              } py-2 rounded text-white text-xs sm:text-sm`}
              onClick={() => setTab("borrow")}
            >
              Borrow
            </button>
            <button
              className={`w-1/4 ${
                tab === "repay" ? "bg-[#323232]" : "text-[#8A8A8A]"
              } py-2 rounded text-white text-xs sm:text-sm`}
              onClick={() => setTab("repay")}
            >
              Repay
            </button>
          </div>

          <div className="w-full py-10">
            <div className="flex justify-between">
              <p className="text-[#C3C3C3] py-2 px-1 text-sm sm:text-md">Supply</p>
              <p className="text-[#C3C3C3] py-2 px-1 text-sm sm:text-md">Wallet Balance: 32 ETH</p>
            </div>
            <div className="flex items-center bg-[#0B0B0B] px-2 rounded-lg border border-[#171717]">
              <input
                placeholder="0.00"
                className="focus:outline-none py-3 bg-[#0B0B0B] text-white/80124 text-md sm:text-xl w-full"
              />
              <div className="flex items-center space-x-2">
                <button className="text-[#838383] hover:text-white transition-colors duration-400 text-sm">MAX</button>

                <button className="flex items-center bg-[#171717] space-x-2 w-20 px-2 py-2 rounded-l-full">
                  <div className="flex items-center gap-1">
                    <Image src={asset.image} alt={asset.underlyingToken.symbol} className="rounded-full h-4" />
                    <span className="text-[#8A8A8A] text-sm">ETH</span>
                  </div>
                  <Image src={Arrow} alt="Arrow" className="h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#141414] w-full rounded-lg p-4">
            <div className="border-b border-[#222222] pb-4 space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <Image src={USDC} alt="USDC" height={24} />
                  <p className="text-[#C3C3C3] text-sm sm:text-md">Supply APY</p>
                </div>
                <p className="text-[#C3C3C3] text-sm sm:text-md">9.75%</p>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <Image src={Distribution} alt="Distribution" height={24} />
                  <p className="text-[#C3C3C3] text-sm sm:text-md">Distribution APY</p>
                </div>
                <p className="text-[#C3C3C3] text-sm sm:text-md">0.05%</p>
              </div>
            </div>

            <div className="flex justify-between py-2">
              <div className="flex items-center space-x-1">
                <p className="text-[#C3C3C3] text-sm sm:text-md">Total APY</p>
                <Image src={I} alt="i" height={18} />
              </div>
              <p className="text-[#C3C3C3] text-sm sm:text-md">9.80%</p>
            </div>
          </div>

          <div className="mt-12 sm:mt-36">
            <Button className="w-full py-2">Supply</Button>
          </div>
        </div>

        <div className="hidden sm:block w-4/12 items-center space-y-4 px-12">
          <div className="bg-[#141414] py-10 px-6 flex flex-col items-center justify-center rounded-xl">
            <p className="text-[#8A8A8A] text-md">Supply Balance</p>
            <p className="text-white text-xl">1200$ ETH</p>
          </div>

          <div className="bg-[#141414] py-10 px-6 flex flex-col items-center justify-center rounded-xl">
            <p className="text-[#8A8A8A] text-md">Daily Earnings</p>
            <p className="text-white text-xl">1200$ ETH</p>
          </div>

          <div className="bg-[#141414] py-10 px-6 flex flex-col items-center justify-center rounded-xl">
            <p className="text-[#8A8A8A] text-md">Another Data</p>
            <p className="text-white text-xl">1200$ ETH</p>
          </div>

          <div className="bg-[#141414] py-10 px-6 flex flex-col items-center justify-center rounded-xl">
            <p className="text-[#8A8A8A] text-md">Borrow Limit</p>
            <p className="text-white text-xl">1200$ ETH</p>
          </div>
        </div>

        <div className="sm:hidden w-full bg-[#0E0E0E] rounded-xl border border-[#171717]">
          <div className="flex w-full justify-between px-4 py-4 items-center border-b border-[#171717]">
            <p className="text-[#6E6E6E] text-md">Supply Balance</p>
            <h1 className="text-white text-md">1200$ ETH</h1>
          </div>
          <div className="flex w-full justify-between px-4 py-4 items-center border-b border-[#171717]">
            <p className="text-[#6E6E6E] text-md">Daily Earnings</p>
            <h1 className="text-white text-md">1200$ ETH</h1>
          </div>
          <div className="flex w-full justify-between px-4 py-4 items-center border-b border-[#171717]">
            <p className="text-[#6E6E6E] text-md">Another Data</p>
            <h1 className="text-white text-md">1200$ ETH</h1>
          </div>
          <div className="flex w-full justify-between px-4 py-4 items-center">
            <p className="text-[#6E6E6E] text-md">Borrow Limit</p>
            <h1 className="text-white text-md">1200$ ETH</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default LendingMain;
