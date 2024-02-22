import { useUserData } from "@/hooks/useUserData";
import useWithdraw from "@/hooks/useWithdraw";
import { CToken } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TabButton from "./TabButton";
import ValueSlider from "@/components/ValueSlider";

interface WithdrawTabProps {
  userDataAsset: any;
  asset: CToken;
  userData: ReturnType<typeof useUserData>;
}

const WithdrawTab: React.FC<WithdrawTabProps> = ({ userDataAsset, asset, userData }) => {
  const { borrowLimit, borrowPercentage, totalBorrowBalance } = userData;

  const [inputValue, setInputValue] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [warningText, setWarningText] = useState("");

  const { onWithdraw } = useWithdraw(asset.address);

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

  const newAmountSupplied = userDataAsset.supplyBalance - inputValue;
  const newBorrowLimit = borrowLimit! - inputValue * +asset.underlyingToken.price;
  const newBorrowUtilization = (totalBorrowBalance! / newBorrowLimit!) * 100;

  const handleInputChange = (value: number) => {
    setInputValue(value);
  };

  useEffect(() => {
    if (inputValue > userDataAsset.supplyBalance) {
      setDisabled(true);
      setWarningText("You can't withdraw more than you supplied.");
    } else {
      setDisabled(false);
      setWarningText("");
    }
  }, [inputValue, userDataAsset.supplyBalance]);

  return (
    <>
      <div className="w-full mt-8">
        <div className="flex justify-between">
          <p className="text-[#C3C3C3] py-2 px-1 text-xs sm:text-sm md:text-base">Withdraw</p>
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
                <Image src={asset.image} alt={asset.underlyingToken.symbol} className="rounded-full h-4 w-auto" />
                <span className="text-[#8A8A8A] text-sm">{asset.underlyingToken.symbol}</span>
              </div>
            </button>
          </div>
        </div>

        <ValueSlider
          value={inputValue}
          onChange={(value) => handleInputChange(value)}
          maxValue={userDataAsset.supplyBalance}
        />
        {warningText && <p className="text-yellow-600 text-center mt-4">{warningText}</p>}

        <div className="bg-[#141414] w-full rounded-lg p-4">
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">Max Withdrawal</p>

            {/* @todo: Set the value of the max withdrawal */}
            <p className="text-white text-xs sm:text-sm md:text-base">0 {asset.underlyingToken.symbol}</p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">Amount Supplied</p>
            <div className="flex gap-2">
              <p className="text-white text-xs sm:text-sm md:text-base">
                {userDataAsset.supplyBalance.toFixed(4)} {asset.underlyingToken.symbol}{" "}
              </p>
              {!!inputValue && (
                <p className="text-red-700 text-xs sm:text-sm md:text-base">
                  {"->"} {newAmountSupplied.toFixed(4)} {asset.underlyingToken.symbol}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">Borrow Limit</p>
            <div className="flex gap-2">
              <p className="text-white text-xs sm:text-sm md:text-base">${borrowLimit?.toFixed(2)}</p>
              {!!inputValue && (
                <p className="text-red-700 text-xs sm:text-sm md:text-base">
                  {"->"} ${newBorrowLimit.toFixed(4)}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">Borrow Utilization</p>
            <div className="flex gap-2">
              <p className="text-white text-xs sm:text-sm md:text-base">{borrowPercentage!.toFixed(2)}%</p>
              {!!inputValue && (
                <p className="text-red-700 text-xs sm:text-sm md:text-base">
                  {"->"} {newBorrowUtilization.toFixed(2)}%
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">Supply APY</p>
            <p className="text-white text-xs sm:text-sm md:text-base">{asset.supplyApy}%</p>
          </div>
        </div>
      </div>
      <TabButton
        text="Withdraw"
        method={async () => await onWithdraw(BigInt(inputValue * 10 ** asset.underlyingToken.decimals))}
        asset={asset}
        inputValue={inputValue}
        setInputValue={setInputValue}
        disabled={disabled}
      />
    </>
  );
};

export default WithdrawTab;
