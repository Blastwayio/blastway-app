import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import TooltipInfo from "@/components/TooltipInfo";
import Image from "next/image";
import ValueSlider from "@/components/ValueSlider";
import useSupply from "@/hooks/useSupply";
import useEnterMarkets from "@/hooks/useEnterMarkets";
import useExitMarket from "@/hooks/useExitMarket";
import { CToken } from "@/types";
import { useUserData } from "@/hooks/useUserData";
import TabButton from "./TabButton";

interface SupplyTabProps {
  userDataAsset: any;
  asset: CToken;
  userData: ReturnType<typeof useUserData>;
}

const SupplyTab: React.FC<SupplyTabProps> = ({ userDataAsset, asset, userData }) => {
  const { borrowLimit } = userData;

  const [inputValue, setInputValue] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [warningText, setWarningText] = useState("");
  const [collateralChecked, setCollateralChecked] = useState(false);

  const { onSupply } = useSupply(asset.address);
  const { onEnterMarkets } = useEnterMarkets([asset.address]);
  const { onExitMarket } = useExitMarket(asset.address);

  const newWalletBalance = userDataAsset.underlyingBalance - inputValue;
  const newAmountSupplied = userDataAsset.supplyBalance + inputValue;
  const newBorrowLimit = borrowLimit! + inputValue * +asset.underlyingToken.price;

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
  }).format(parseInt(userDataAsset.underlyingBalance) * +asset.underlyingToken.price);

  const handleInputChange = (value: number) => {
    setInputValue(value);
  };

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

  useEffect(() => {
    if (userDataAsset.isInMarket) {
      setCollateralChecked(true);
    } else {
      setCollateralChecked(false);
    }
  }, [userDataAsset.isInMarket]);

  useEffect(() => {
    if (inputValue > userDataAsset.underlyingBalance) {
      setDisabled(true);
      setWarningText("You can't supply more than you have.");
    } else {
      setDisabled(false);
      setWarningText("");
    }
  }, [inputValue, userDataAsset.underlyingBalance]);

  return (
    <>
      <div className="w-full mt-8">
        <div className="flex justify-between">
          <p className="text-[#C3C3C3] py-2 px-1 text-xs sm:text-sm md:text-base">Supply</p>
          <div className="flex flex-col items-end py-2 px-1 w-full text-white text-xs sm:text-sm md:text-base">
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
            max={+totalBalanceFormatted}
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
          maxValue={userDataAsset.underlyingBalance || 100}
        />
        {warningText && <p className="text-yellow-600 text-center mt-4">{warningText}</p>}
        <div className="bg-[#141414] w-full rounded-lg p-4">
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">Wallet Balance</p>
            <div className="flex gap-2">
              <p className="text-white text-xs sm:text-sm md:text-base">
                {userDataAsset.underlyingBalance.toFixed(4)} {asset.underlyingToken.symbol}
              </p>
              {!!inputValue && (
                <p className="text-red-700 text-xs sm:text-sm md:text-base">
                  {"->"} {newWalletBalance.toFixed(4)} {asset.underlyingToken.symbol}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">Amount Supplied</p>
            <div className="flex gap-2">
              <p className="text-white text-xs sm:text-sm md:text-base">
                {userDataAsset.supplyBalance.toFixed(4)} {asset.underlyingToken.symbol}
              </p>
              {!!inputValue && (
                <p className="text-green-700 text-xs sm:text-sm md:text-base">
                  {"->"} {newAmountSupplied.toFixed(4)} {asset.underlyingToken.symbol}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="flex gap-2 items-center text-gray-400 text-xs sm:text-sm md:text-base">
              Use as Collateral <TooltipInfo text="Toggle to enable borrowing against the assets." />
            </p>
            <Switch
              checked={collateralChecked}
              onClick={collateralChecked ? exitMarket : enterMarket}
              className="bg-[#343638]"
            />
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="flex gap-2 items-center text-gray-400 text-xs sm:text-sm md:text-base">
              Collateral Factor <TooltipInfo text="The percentage of the asset value that can be used as collateral" />
            </p>
            <p className="text-white text-xs sm:text-sm md:text-base">{+asset.collateralFactor * 100}%</p>
          </div>
          <div className="flex justify-between items-center py-2">
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">Borrow Limit</p>
            <div className="flex gap-2">
              <p className="text-white text-xs sm:text-sm md:text-base">${borrowLimit?.toFixed(2)}</p>
              {!!inputValue && (
                <p className="text-green-700 text-xs sm:text-sm md:text-base">
                  {"->"} ${newBorrowLimit.toFixed(4)}
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
        text="Supply"
        method={async () => await onSupply(BigInt(inputValue * 10 ** asset.underlyingToken.decimals))}
        asset={asset}
        inputValue={inputValue}
        disabled={disabled}
      />
    </>
  );
};

export default SupplyTab;
