import ValueSlider from "@/components/ValueSlider";
import useRepay from "@/hooks/useRepay";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TabButton from "../TabButton";

interface RepayTabProps {
  asset: any;
}

const RepayTabLoading: React.FC<RepayTabProps> = ({ asset }) => {
  const [inputValue, setInputValue] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [warningText, setWarningText] = useState("");

  const { onRepay } = useRepay(asset.address);

  const handleInputChange = (value: number) => {
    setInputValue(value);
  };

  return (
    <>
      <div className="w-full mt-8">
        <div className="flex justify-between">
          <p className="text-[#C3C3C3] py-2 px-1 text-sm sm:test-base">Repay</p>
          <div className="flex flex-col items-end py-2 px-1 w-full text-white text-sm sm:text-base gap-1">
            <div className="h-3.5 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-1/5"></div>
            <div className="h-3.5 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-1/12"></div>
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
            className="focus:outline-none py-3 bg-[#0B0B0B] text-white/80124 test-base text-white sm:text-xl w-full"
            onChange={(e) => handleInputChange(Number(e.target.value))}
          />

          <div className="flex items-center space-x-2">
            <button className="flex items-center bg-[#171717] space-x-2 w-20 px-2 py-2 rounded-l-full">
              <div className="flex items-center gap-1">
                <Image
                  src={asset.image}
                  alt={asset.underlyingToken.symbol}
                  className="rounded-full h-4"
                />
                <span className="text-[#8A8A8A] text-sm">
                  {asset.underlyingToken.symbol}
                </span>
              </div>
            </button>
          </div>
        </div>
        <ValueSlider
          value={inputValue}
          onChange={(value) => handleInputChange(value)}
          maxValue={100}
        />
        {warningText && <p className="text-yellow-600">{warningText}</p>}
        <div className="bg-[#141414] w-full rounded-lg p-4">
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 test-base">Wallet Balance</p>
            <div className="h-4 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-1/5"></div>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 test-base">Total Borrow Balance</p>
            <div className="h-4 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-1/5"></div>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 test-base">Borrow Utilization</p>
            <div className="h-4 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-1/5"></div>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 test-base">Borrow APY</p>
            <div className="h-4 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-1/5"></div>
          </div>
        </div>
      </div>
      <TabButton
        text="Repay"
        method={async () =>
          await onRepay(
            BigInt(inputValue * 10 ** asset.underlyingToken.decimals)
          )
        }
        asset={asset}
        inputValue={inputValue}
        disabled={disabled}
      />
    </>
  );
};

export default RepayTabLoading;
