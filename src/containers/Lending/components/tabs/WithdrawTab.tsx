// components/LendingTabs/WithdrawTab.tsx
import Image from "next/image";
import React from "react";

interface WithdrawTabProps {
  userDataAsset: any; // Replace with the actual type
  userBorrowLimit: number | undefined;
  borrowPercentage: number | undefined;
  asset: any; // Replace with the actual type
  inputValue: number;
  onInputChange: (value: number) => void;
}

const WithdrawTab: React.FC<WithdrawTabProps> = ({
  userDataAsset,
  userBorrowLimit,
  borrowPercentage,
  asset,
  inputValue,
  onInputChange,
}) => {
  return (
    <>
      <div className="flex flex-col w-full gap-8">
        <div className="flex items-center bg-[#0B0B0B] px-2 rounded-lg border border-[#171717] gap-8">
          <input
            type="number"
            placeholder="0.00"
            min={0}
            value={inputValue === 0 ? "" : inputValue}
            className="focus:outline-none py-3 bg-[#0B0B0B] text-white/80124 text-md text-white sm:text-xl w-full"
            onChange={(e) => onInputChange(Number(e.target.value))}
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

        {/* @todo: Add the ValueSlider component here */}

        <div className="bg-[#141414] w-full rounded-lg p-4">
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-md">Max Withdrawal</p>

            {/* @todo: Set the value of the max withdrawal */}          
            <p className="text-white text-md">0 {asset.underlyingToken.symbol}</p>

          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-md">Amount Supplied</p>
            <p className="text-white text-md">
              {userDataAsset.supplyBalance} {asset.underlyingToken.symbol}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-md">Borrow Limit</p>
            <p className="text-white text-md">${userBorrowLimit?.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-md">Borrow Utilization</p>
            <p className="text-white text-md">{borrowPercentage!.toFixed(2)}%</p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-md">Supply APY</p>
            <p className="text-white text-md">{asset.supplyApy}%</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithdrawTab;
