import ValueSlider from "@/components/ValueSlider";
import useRepay from "@/hooks/useRepay";
import { useUserData } from "@/hooks/useUserData";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TabButton from "./TabButton";

interface RepayTabProps {
  userDataAsset: any;
  asset: any;
  userData: ReturnType<typeof useUserData>;
}

const RepayTab: React.FC<RepayTabProps> = ({ userDataAsset, asset, userData }) => {
  const { borrowPercentage, totalBorrowBalance } = userData;

  const [inputValue, setInputValue] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [warningText, setWarningText] = useState("");

  const { onRepay } = useRepay(asset.address);

  const totalBalanceFormatted = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(userDataAsset.underlyingBalance);

  const totalBalancePriceFormatted = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(userDataAsset.underlyingBalance * +asset.underlyingToken.price);

  const handleInputChange = (value: number) => {
    setInputValue(value);
  };

  useEffect(() => {
    if (inputValue > userDataAsset.borrowBalance) {
      setDisabled(true);
      setWarningText("You can't repay more than you borrowed.");
    } else {
      setDisabled(false);
      setWarningText("");
    }
  }, [inputValue, userDataAsset.borrowBalance]);

  return (
    <>
      <div className="w-full mt-8">
        <div className="flex justify-between">
          <p className="text-[#C3C3C3] py-2 px-1 text-xs sm:text-sm md:text-base">Repay</p>
          <div className="flex flex-col items-end py-2 px-1 text-[#C3C3C3] text-xs sm:text-sm md:text-base">
            <p>
              Wallet Balance: {totalBalanceFormatted} {asset.underlyingToken.symbol}
            </p>
            <p>~{totalBalancePriceFormatted}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-8">
        <div className="flex items-center bg-[#0B0B0B] px-2 rounded-lg border border-[#171717] gap-8">
          <input
            type="number"
            placeholder="0.00"
            min={0}
            value={inputValue === 0 ? "" : inputValue}
            className="focus:outline-none py-3 bg-[#0B0B0B] text-white/80124 text-md text-white sm:text-xl w-full"
            onChange={(e) => handleInputChange(Number(e.target.value))}
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
          onChange={(value) => handleInputChange(value)}
          maxValue={userDataAsset.borrowBalance || 100}
        />
        {warningText && <p className="text-yellow-600 text-center mt-4">{warningText}</p>}
        <div className="bg-[#141414] w-full rounded-lg p-4">
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">Wallet Balance</p>
            <p className="text-white text-xs sm:text-sm md:text-base">
              {userDataAsset.underlyingBalance.toFixed(4)} {asset.underlyingToken.symbol}
            </p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">Total Borrow Balance</p>
            <p className="text-white text-xs sm:text-sm md:text-base">${totalBorrowBalance}</p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">Borrow Utilization</p>
            <p className="text-white text-xs sm:text-sm md:text-base">{borrowPercentage!.toFixed(2)}%</p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">Borrow APY</p>
            <p className="text-white text-xs sm:text-sm md:text-base">{asset.borrowApy}%</p>
          </div>
        </div>
      </div>
      <TabButton
        text="Repay"
        method={async () => await onRepay(BigInt(inputValue * 10 ** asset.underlyingToken.decimals))}
        asset={asset}
        inputValue={inputValue}
        disabled={disabled}
      />
    </>
  );
};

export default RepayTab;
