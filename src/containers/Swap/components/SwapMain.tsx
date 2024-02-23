'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SwapButton from '@/containers/Swap/components/SwapButton';
import SwapArrows from '/public/images/swap/swap-arrows.svg';
import USDCTokenImage from '/public/images/tokens/usdc.webp';
import USDTTokenImage from '/public/images/tokens/usdt.webp';
import { useAccount, useReadContract } from 'wagmi';
import { erc20Abi } from 'viem';
import ADDRESSES from '@/config/constants/addresses';
import { CHAIN_ID } from '@/config';

const SwapMain = () => {
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  const { address: account } = useAccount();

  const { data: userUsdcBalanceData } = useReadContract({
    abi: erc20Abi,
    address: ADDRESSES.ThrusterUSDC[CHAIN_ID] as `0x${string}`,
    functionName: 'balanceOf',
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
    <div className="flex w-full  flex-col space-y-4 lg:w-4/5 lg:self-center xl:w-2/5">
      <div className="mx-auto flex w-full flex-col gap-8 rounded-xl border border-[#171717] bg-[#0E0E0E] px-2 py-4 sm:px-6 ">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <p className="px-1 py-2 text-base text-[#C3C3C3]">From</p>
            <div className="flex items-end gap-2 px-1 py-2 text-sm text-[#3E3E3E]">
              <p>Wallet Balance: </p>
              <p className="text-sm text-[#3E3E3E]">{userUsdcBalance} USDC</p>
            </div>
          </div>
          <div className="flex items-center rounded-lg border border-[#171717] bg-[#0B0B0B] px-2">
            <input
              type="number"
              placeholder="0.00"
              onChange={(e) => {
                setFromAmount(+e.target.value);
              }}
              className="text-white/80124 text-md w-full bg-[#0B0B0B] py-3 text-white focus:outline-none sm:text-xl"
            />
            <div className="flex items-center space-x-2">
              <button className="flex w-20 items-center space-x-2 rounded-l-full bg-[#171717] px-2 py-2">
                <div className="flex items-center gap-1">
                  <Image src={USDCTokenImage} alt={'A token image'} className="h-4 w-auto rounded-full" />
                  <span className="text-sm text-[#8A8A8A]">USDC</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Image src={SwapArrows} alt="Swap Arrows" className="mx-auto" />
          <div className="flex items-center justify-between">
            <p className="px-1 py-2 text-base text-[#C3C3C3]">To</p>
          </div>
          <div className="flex items-center rounded-lg border border-[#171717] bg-[#0B0B0B] px-2">
            <input
              type="number"
              placeholder="0.00"
              value={toAmount}
              readOnly
              className="text-white/80124 text-md w-full bg-[#0B0B0B] py-3 text-white focus:outline-none sm:text-xl"
            />
            <div className="flex items-center space-x-2">
              <button className="flex w-20 items-center space-x-2 rounded-l-full bg-[#171717] px-2 py-2">
                <div className="flex items-center gap-1">
                  <Image src={USDTTokenImage} alt={'A token image'} className="h-4 w-auto rounded-full" />
                  <span className="text-sm text-[#8A8A8A]">USDT</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <SwapButton fromAmount={fromAmount} toAmount={toAmount} />
      </div>
    </div>
  );
};

export default SwapMain;
