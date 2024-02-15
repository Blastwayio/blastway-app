import ValueSlider from "@/components/ValueSlider";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import React from "react";

interface BorrowTabProps {
  collateralChecked: boolean;
  exitMarket: () => void;
  enterMarket: () => void;
  userBorrowLimit: number | undefined;
  borrowPercentage: number | undefined;
  totalBorrowBalance: number | undefined;
  asset: any;
  inputValue: number;
  onInputChange: (value: number) => void;
}

const BorrowTab: React.FC<BorrowTabProps> = ({
  collateralChecked,
  exitMarket,
  enterMarket,
  userBorrowLimit,
  borrowPercentage,
  totalBorrowBalance,
  asset,
  inputValue,
  onInputChange,
}) => {
  const userBorrowLimitFormatted = userBorrowLimit ? +userBorrowLimit : 0;
  const totalLiquidityFormatted = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(+asset.totalCash / 10 ** asset.underlyingToken.decimals);
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
        <ValueSlider
          value={inputValue}
          onChange={(value) => onInputChange(value)}
          maxValue={userBorrowLimitFormatted}
        />
        <div className="bg-[#141414] w-full rounded-lg p-4">
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-md">Total Borrow Balance</p>
            <p className="text-white text-md">${totalBorrowBalance}</p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-md">Borrow Limit</p>
            <p className="text-white text-md">${userBorrowLimit?.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-md">Use as Collateral</p>
            <Switch
              checked={collateralChecked}
              onClick={collateralChecked ? exitMarket : enterMarket}
              className="bg-[#343638]"
            />
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-md">Borrow Utilization</p>
            <p className="text-white text-md">{borrowPercentage!.toFixed(2)}%</p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-md">Borrow APY</p>
            <p className="text-white text-md">{asset.borrowApy}%</p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-md">Available Liquidity</p>
            <p className="text-white text-md">
              {totalLiquidityFormatted} {asset.underlyingToken.symbol}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-md">% of Supply Borrowed</p>
            <p className="text-white text-md">0%</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BorrowTab;
