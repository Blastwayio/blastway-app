import Image from 'next/image';
import React from 'react';
import ETH from '/public/images/tokens/eth.svg';
import Assets from '/public/images/assets.svg';

interface Status {
  marketSize: string;
  marketSizePercent: string;
  dLPLocked: string;
  dLPLockedPercentage: string;
  feesPaid: string;
  assetAmount: string;
}

interface LendingStatsProps {
  stats: Status[];
}

const LendingStats: React.FC<LendingStatsProps> = ({ stats }) => {
  return (
    <>
      <div className="flex w-full justify-between py-4 sm:py-8">
        <div className="flex flex-col items-center px-0 text-white sm:px-16">
          <p className="text-md text-[#848484] sm:text-lg">Market Size</p>
          <p className="text-xl text-[#DADADA] sm:text-3xl">${stats[0].marketSize}</p>
          <div className="flex items-center space-x-1">
            <Image src={ETH} alt="eth" height={20} />
            <p className="text-md text-[#848484] sm:text-lg">{stats[0].marketSizePercent}%</p>
          </div>
        </div>

        <div className="flex flex-col items-center px-0 text-white sm:px-16">
          <p className="text-md text-[#848484] sm:text-lg">dLP locked</p>
          <p className="text-xl text-[#DADADA] sm:text-3xl">%{stats[0].dLPLockedPercentage}</p>
          <p className="text-md text-[#848484] sm:text-lg">${stats[0].dLPLocked} USD</p>
        </div>

        <div className="flex flex-col items-center px-0 text-white sm:px-16">
          <p className="text-md text-[#848484] sm:text-lg">Fees Paid</p>
          <p className="text-xl text-[#DADADA] sm:text-3xl">${stats[0].feesPaid}</p>
          <div className="flex items-center space-x-1">
            <Image src={Assets} alt="assets" height={20} />
            <p className="text-md text-[#848484] sm:text-lg">{stats[0].assetAmount} assets</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LendingStats;
