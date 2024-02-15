import ValueSlider from "@/components/ValueSlider";
import { Switch } from "@/components/ui/switch";
import useBorrow from "@/hooks/useBorrow";
import useEnterMarkets from "@/hooks/useEnterMarkets";
import useExitMarket from "@/hooks/useExitMarket";
import { useUserData } from "@/hooks/useUserData";
import { CToken } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TabButton from "./TabButton";

interface BorrowTabProps {
  asset: CToken;
  userDataAsset: any;
  userData: ReturnType<typeof useUserData>;
}

const BorrowTab: React.FC<BorrowTabProps> = ({ asset, userDataAsset, userData }) => {
  const { borrowLimit, borrowPercentage, totalBorrowBalance } = userData;

  const [inputValue, setInputValue] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [warningText, setWarningText] = useState("");
  const [collateralChecked, setCollateralChecked] = useState(false);

  const { onBorrow } = useBorrow(asset.address);
  const { onEnterMarkets } = useEnterMarkets([asset.address]);
  const { onExitMarket } = useExitMarket(asset.address);

  const userBorrowLimitFormatted = borrowLimit ? +borrowLimit : 0;
  const inputTokenPrice = inputValue * +asset.underlyingToken.price;

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

  const totalLiquidityFormatted = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(+asset.totalCash / 10 ** asset.underlyingToken.decimals);

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

  useEffect(() => {
    if (userDataAsset.isInMarket) {
      setCollateralChecked(true);
    } else {
      setCollateralChecked(false);
    }
  }, [userDataAsset.isInMarket]);

  useEffect(() => {
    if (inputTokenPrice > borrowLimit!) {
      setDisabled(true);
      setWarningText(
        `Borrow limit exceeded. Add more collateral (${
          +asset.collateralFactor * 100
        }% factor) to increase limit. Ensure assets are marked as collateral.`
      );
    } else {
      setDisabled(false);
      setWarningText("");
    }
  }, [inputTokenPrice, borrowLimit, +asset.collateralFactor]);

  return (
    <>
      <div className="w-full mt-8">
        <div className="flex justify-between">
          <p className="text-[#C3C3C3] py-2 px-1 text-sm sm:text-md">Borrow</p>
          <div className="flex flex-col items-end py-2 px-1 text-[#C3C3C3] text-sm sm:text-md">
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
          maxValue={userBorrowLimitFormatted || 100}
        />
        {warningText && <p className="text-yellow-600 text-center mt-4">{warningText}</p>}
        <div className="bg-[#141414] w-full rounded-lg p-4">
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-md">Total Borrow Balance</p>
            <p className="text-white text-md">${totalBorrowBalance}</p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-md">Borrow Limit</p>
            <p className="text-white text-md">${borrowLimit?.toFixed(2)}</p>
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
      <TabButton
        text="Borrow"
        method={async () => await onBorrow(BigInt(inputValue * 10 ** asset.underlyingToken.decimals))}
        asset={asset}
        inputValue={inputValue}
        disabled={disabled}
      />
    </>
  );
};

export default BorrowTab;
