import ValueSlider from "@/components/ValueSlider";
import { Switch } from "@/components/ui/switch";
import useBorrow from "@/hooks/useBorrow";
import useEnterMarkets from "@/hooks/useEnterMarkets";
import useExitMarket from "@/hooks/useExitMarket";
import { CToken } from "@/types";
import Image from "next/image";
import React, { useState } from "react";

import TabButton from "../TabButton";

interface BorrowTabProps {
  asset: CToken;
}

const BorrowTabLoading: React.FC<BorrowTabProps> = ({ asset }) => {
  const [inputValue, setInputValue] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [warningText, setWarningText] = useState("");
  const [collateralChecked, setCollateralChecked] = useState(false);

  const { onBorrow } = useBorrow(asset.address);
  const { onEnterMarkets } = useEnterMarkets([asset.address]);
  const { onExitMarket } = useExitMarket(asset.address);

  const enterMarket = async () => {
    try {
      await onEnterMarkets();
      setCollateralChecked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const exitMarket = async () => {
    try {
      await onExitMarket();
      setCollateralChecked(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (value: number) => {
    setInputValue(value);
  };

  return (
    <>
      <div className="w-full mt-8">
        <div className="flex justify-between">
          <p className="text-[#C3C3C3] py-2 px-1 text-sm sm:test-base">
            Borrow
          </p>
          <div className="flex flex-col items-end py-2 px-1 w-full text-white text-sm sm:test-base gap-1">
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
        {warningText && <p className="text-yellow-600">{warningText}</p>}
        <div className="bg-[#141414] w-full rounded-lg p-4">
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-base">Total Borrow Balance</p>
            <div className="h-4 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-1/5"></div>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-base">Borrow Limit</p>
            <div className="h-4 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-1/5"></div>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-base">Use as Collateral</p>
            <Switch
              checked={collateralChecked}
              onClick={collateralChecked ? exitMarket : enterMarket}
              className="bg-[#343638]"
            />
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-base">Borrow Utilization</p>
            <div className="h-4 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-1/5"></div>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-base">Borrow APY</p>
            <div className="h-4 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-1/5"></div>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-base">Available Liquidity</p>
            <div className="h-4 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-1/5"></div>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-base">% of Supply Borrowed</p>
            <div className="h-4 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-1/5"></div>
          </div>
        </div>
      </div>
      <TabButton
        text="Borrow"
        method={async () =>
          await onBorrow(
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

export default BorrowTabLoading;
