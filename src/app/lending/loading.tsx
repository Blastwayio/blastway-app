import Link from 'next/link';
import Arrow from '/public/images/arrow.svg';
import Image from 'next/image';
import { CTokenConfig } from '@/types';
import assets from '@/config/constants/assets';
import { Button } from '@/components/ui/button';
import { InfoIcon } from 'lucide-react';

interface LendingTopAssetProps {
  asset: CTokenConfig;
}

const tabs = [
  {
    title: 'Supply',
  },
  {
    title: 'Withdraw',
  },
  {
    title: 'Borrow',
  },
  {
    title: 'Repay',
  },
];

const LendingLoading = () => {
  const asset = assets[0];

  return (
    <main className="sm:align-center space-y-4 px-4 py-4 sm:ml-60 sm:px-10">
      <div className="hidden w-full items-center gap-20 rounded-xl border border-[#171717] bg-[#0E0E0E] lg:flex">
        <div className="mx-auto flex w-full justify-between gap-5 pr-16">
          <div className="flex flex-col items-center py-6 ">
            <p className="text-md text-[#838383]">Asset price</p>
            <div className="h-7 w-3/4 animate-pulse rounded-full bg-gray-400 bg-opacity-40"></div>
          </div>

          <div className="flex flex-col items-center py-6 ">
            <p className="text-md text-[#838383]">Borrow APY</p>
            <div className="h-7 w-3/4 animate-pulse rounded-full bg-gray-400 bg-opacity-40"></div>
          </div>

          <div className="flex flex-col items-center py-6 ">
            <p className="text-md text-[#838383]">Supply APY</p>
            <div className="h-7 w-3/4 animate-pulse rounded-full bg-gray-400 bg-opacity-40"></div>
          </div>
        </div>
      </div>

      <div className="space-y-4 lg:hidden">
        <div className="flex w-full items-center justify-center gap-8 rounded-xl border border-[#171717] bg-[#0E0E0E] px-2">
          <div className="flex flex-col items-center py-6">
            <p className="text-xs text-[#838383]">Asset price</p>
            <div className="h-6 w-full animate-pulse rounded-full bg-gray-400 bg-opacity-40"></div>
          </div>

          <div className="flex flex-col items-center py-6">
            <p className="text-xs text-[#838383]">Borrow APY</p>
            <div className="h-6 w-full animate-pulse rounded-full bg-gray-400 bg-opacity-40"></div>
          </div>
        </div>
      </div>
      <>
        <div className="sm:flex-col-2 flex w-full flex-col space-y-4 sm:flex-row">
          <div className="mx-auto flex w-full flex-col rounded-xl border border-[#171717] bg-[#0E0E0E] px-2 py-4 sm:w-8/12 sm:px-6">
            <div className="flex w-full justify-between rounded-lg bg-[#161616] px-1 py-1.5 sm:px-1.5">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`w-1/4 ${
                    !index ? 'bg-[#323232]' : 'text-[#8A8A8A]'
                  } rounded py-2 text-xs text-white sm:text-sm`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            <>
              <div className="mt-8 w-full">
                <div className="flex justify-between">
                  <p className="sm:text-md px-1 py-2 text-sm text-[#C3C3C3]">Supply</p>
                  <div className="sm:text-md flex w-full flex-col items-end px-1 py-2 text-sm text-white">
                    <p>
                      Wallet Balance:{' '}
                      <div className="h-6 w-16 animate-pulse rounded-full bg-gray-400 bg-opacity-40"></div>
                      {asset.underlyingToken.symbol}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-8">
                <div className="flex items-center gap-8 rounded-lg border border-[#171717] bg-[#0B0B0B] px-2">
                  <input
                    type="number"
                    placeholder="0.00"
                    className="text-white/80124 text-md w-full bg-[#0B0B0B] py-3 text-white focus:outline-none sm:text-xl"
                  />

                  <div className="flex items-center space-x-2">
                    <button className="flex w-20 items-center space-x-2 rounded-l-full bg-[#171717] px-2 py-2">
                      <div className="flex items-center gap-1">
                        <Image src={asset.image} alt={asset.underlyingToken.symbol} className="h-4 rounded-full" />
                        <span className="text-sm text-[#8A8A8A]">{asset.underlyingToken.symbol}</span>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="w-full rounded-lg bg-[#141414] p-4">
                  <div className="flex items-center justify-between py-2">
                    <p className="text-md text-gray-400">Wallet Balance</p>
                    <div className="flex gap-2 text-white">
                      <div className="h-6 w-16 animate-pulse rounded-full bg-gray-400 bg-opacity-40"></div>
                      {asset.underlyingToken.symbol}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <p className="text-md text-gray-400">Amount Supplied</p>
                    <div className="flex gap-2 text-white">
                      <div className="h-6 w-16 animate-pulse rounded-full bg-gray-400 bg-opacity-40"></div>{' '}
                      {asset.underlyingToken.symbol}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <p className="text-md flex items-center gap-2 text-gray-400">
                      Use as Collateral <InfoIcon className="h-4 w-4" />
                    </p>
                    <div className="flex gap-2">
                      <div className="h-6 w-16 animate-pulse rounded-full bg-gray-400 bg-opacity-40"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <p className="text-md flex items-center gap-2 text-gray-400">
                      Collateral Factor <InfoIcon className="h-4 w-4" />
                    </p>
                    <div className="flex gap-2 text-white">
                      <div className="h-6 w-16 animate-pulse rounded-full bg-gray-400 bg-opacity-40"></div>%
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <p className="text-md text-gray-400">Borrow Limit</p>
                    <div className="flex gap-2">
                      <div className="h-6 w-16 animate-pulse rounded-full bg-gray-400 bg-opacity-40"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <p className="text-md text-gray-400">Supply APY</p>
                    <div className="flex gap-2 text-white">
                      <div className="h-6 w-16 animate-pulse rounded-full bg-gray-400 bg-opacity-40"></div>%
                    </div>
                  </div>
                </div>
              </div>
              <Button className="mt-8 w-full py-2">Supply</Button>
            </>
          </div>
        </div>
      </>
    </main>
  );
};

export default LendingLoading;
