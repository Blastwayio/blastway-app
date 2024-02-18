"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import SwapButton from "@/containers/Swap/components/SwapButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import SwapArrows from "/public/images/swap/swap-arrows.svg";
import USDCTokenImage from "/public/images/tokens/usdc.webp";
import USDTTokenImage from "/public/images/tokens/usdt.webp";
import { useAccount, useReadContract } from "wagmi";
import { erc20Abi } from "viem";
import ADDRESSES from "@/config/constants/addresses";
import { CHAIN_ID } from "@/config";

const SwapMain = () => {
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  const { address: account } = useAccount();

  const { data: userUsdcBalanceData } = useReadContract({
    abi: erc20Abi,
    address: ADDRESSES.ThrusterUSDC[CHAIN_ID] as `0x${string}`,
    functionName: "balanceOf",
    args: [account!],
  });

  const userUsdcBalance = (Number(userUsdcBalanceData) / 1e18).toFixed(2);

  useEffect(() => {
    const fetchQuote = async () => {
      const quote = await axios.get(
        `https://thruster-api-2sjjqcgcja-ew.a.run.app/quote?amount=${
          fromAmount * 1e18
        }&tokenIn=0xd3e6fb238cc85b50f27eabbd0d7c58f05a4c28c3&tokenOut=0x671f1aab1aa66fcd2d7e706c9101e3dd8a15bfc4&type=EXACT_INPUT&chainId=168587773`
      );
      setToAmount(Math.floor((quote.data.bestQuote.quote / 1e18) * 1e7) / 1e7);
    };

    fetchQuote();
  }, [fromAmount]);

  return (
    <div className="flex flex-col  w-full lg:w-4/5 xl:w-2/5 lg:self-center space-y-4">
      <div className="bg-[#0E0E0E] w-full px-2 sm:px-6 py-4 rounded-xl mx-auto border border-[#171717] flex flex-col gap-8 ">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <p className="text-[#C3C3C3] py-2 px-1 text-base">From</p>
            <div className="flex gap-2 items-end py-2 px-1 text-[#3E3E3E] text-sm">
              <p>Wallet Balance: </p>
              <p className="text-[#3E3E3E] text-sm">{userUsdcBalance} USDC</p>
            </div>
          </div>
          <div className="flex items-center bg-[#0B0B0B] px-2 rounded-lg border border-[#171717]">
            <input
              type="number"
              placeholder="0.00"
              onChange={(e) => {
                setFromAmount(+e.target.value);
              }}
              className="focus:outline-none py-3 bg-[#0B0B0B] text-white/80124 text-md text-white sm:text-xl w-full"
            />
            <div className="flex items-center space-x-2">
              <button className="flex items-center bg-[#171717] space-x-2 w-20 px-2 py-2 rounded-l-full">
                <div className="flex items-center gap-1">
                  <Image src={USDCTokenImage} alt={"A token image"} className="rounded-full h-4 w-auto" />
                  <span className="text-[#8A8A8A] text-sm">USDC</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Image src={SwapArrows} alt="Swap Arrows" className="mx-auto" />
          <div className="flex justify-between items-center">
            <p className="text-[#C3C3C3] py-2 px-1 text-base">To</p>
          </div>
          <div className="flex items-center bg-[#0B0B0B] px-2 rounded-lg border border-[#171717]">
            <input
              type="number"
              placeholder="0.00"
              value={toAmount}
              readOnly
              className="focus:outline-none py-3 bg-[#0B0B0B] text-white/80124 text-md text-white sm:text-xl w-full"
            />
            <div className="flex items-center space-x-2">
              <button className="flex items-center bg-[#171717] space-x-2 w-20 px-2 py-2 rounded-l-full">
                <div className="flex items-center gap-1">
                  <Image src={USDTTokenImage} alt={"A token image"} className="rounded-full h-4 w-auto" />
                  <span className="text-[#8A8A8A] text-sm">USDT</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <SwapButton fromAmount={fromAmount} toAmount={toAmount} />
          </TooltipTrigger>
          <TooltipContent className="bg-[#18181b] border-none text-white">
            <p>The swap feature is currently disabled, coming soon!</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default SwapMain;
