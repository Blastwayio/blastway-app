import ValueSlider from '@/components/ValueSlider';
import { Switch } from '@/components/ui/switch';
import useBorrow from '@/hooks/useBorrow';
import useEnterMarkets from '@/hooks/useEnterMarkets';
import useExitMarket from '@/hooks/useExitMarket';
import { useUserData } from '@/hooks/useUserData';
import { CToken } from '@/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TabButton from './TabButton';

interface BorrowTabProps {
  asset: CToken;
  userDataAsset: any;
  userData: ReturnType<typeof useUserData>;
}

const BorrowTab: React.FC<BorrowTabProps> = ({ asset, userDataAsset, userData }) => {
  const { borrowLimit, borrowPercentage, totalBorrowBalance } = userData;

  const [inputValue, setInputValue] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [warningText, setWarningText] = useState('');
  const [collateralChecked, setCollateralChecked] = useState(false);

  const { onBorrow } = useBorrow(asset.address);
  const { onEnterMarkets } = useEnterMarkets([asset.address]);
  const { onExitMarket } = useExitMarket(asset.address);

  const userMaxBorrowable = borrowLimit! / +asset.underlyingToken.price;
  const inputTokenPrice = inputValue;

  console.log(
    'borrow limit: ',
    borrowLimit,
    'totalBorrowBalance: ',
    totalBorrowBalance,
    'userMaxBorrowable',
    userMaxBorrowable
  );

  const totalBalanceFormatted = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(userDataAsset.underlyingBalance);

  const totalBalancePriceFormatted = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(userDataAsset.underlyingBalance * +asset.underlyingToken.price);

  const totalLiquidityFormatted = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
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
    if (inputTokenPrice > userMaxBorrowable!) {
      setDisabled(true);
      setWarningText(
        `Borrow limit exceeded. Add more collateral (${
          +asset.collateralFactor * 100
        }% factor) to increase limit. Ensure assets are marked as collateral.`
      );
    } else {
      setDisabled(false);
      setWarningText('');
    }
  }, [inputTokenPrice, borrowLimit]);

  return (
    <>
      <div className="mt-8 w-full">
        <div className="flex justify-between">
          <p className="px-1 py-2 text-xs text-[#C3C3C3] sm:text-sm md:text-base">Borrow</p>
          <div className="flex flex-col items-end px-1 py-2 text-xs text-[#C3C3C3] sm:text-sm md:text-base">
            <p>
              Wallet Balance: {totalBalanceFormatted} {asset.underlyingToken.symbol}
            </p>
            <p>~{totalBalancePriceFormatted}</p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-8">
        <div className="flex items-center gap-8 rounded-lg border border-[#171717] bg-[#0B0B0B] px-2">
          <input
            type="number"
            placeholder="0.00"
            min={0}
            value={inputValue === 0 ? '' : inputValue}
            className="text-white/80124 text-md w-full bg-[#0B0B0B] py-3 text-white focus:outline-none sm:text-xl"
            onChange={(e) => handleInputChange(Number(e.target.value))}
          />

          <div className="flex items-center space-x-2">
            <button className="flex w-20 items-center space-x-2 rounded-l-full bg-[#171717] px-2 py-2">
              <div className="flex items-center gap-1">
                <Image src={asset.image} alt={asset.underlyingToken.symbol} className="h-4 w-auto rounded-full" />
                <span className="text-sm text-[#8A8A8A]">{asset.underlyingToken.symbol}</span>
              </div>
            </button>
          </div>
        </div>
        <ValueSlider value={inputValue} onChange={(value) => handleInputChange(value)} maxValue={userMaxBorrowable} />
        {warningText && <p className="mt-4 text-center text-yellow-600">{warningText}</p>}
        <div className="w-full rounded-lg bg-[#141414] p-4">
          <div className="flex items-center justify-between py-2">
            <p className="text-xs text-gray-400 sm:text-sm md:text-base">Total Borrow Balance</p>
            <p className="text-xs text-white sm:text-sm md:text-base">${totalBorrowBalance}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <p className="text-xs text-gray-400 sm:text-sm md:text-base">Borrow Limit</p>
            <p className="text-xs text-white sm:text-sm md:text-base">${borrowLimit?.toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <p className="text-xs text-gray-400 sm:text-sm md:text-base">Use as Collateral</p>
            <Switch
              checked={collateralChecked}
              onClick={collateralChecked ? exitMarket : enterMarket}
              className="bg-[#343638]"
            />
          </div>
          <div className="flex items-center justify-between py-2">
            <p className="text-xs text-gray-400 sm:text-sm md:text-base">Borrow Utilization</p>
            <p className="text-xs text-white sm:text-sm md:text-base">{borrowPercentage!.toFixed(2)}%</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <p className="text-xs text-gray-400 sm:text-sm md:text-base">Borrow APY</p>
            <p className="text-xs text-white sm:text-sm md:text-base">{asset.borrowApy}%</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <p className="text-xs text-gray-400 sm:text-sm md:text-base">Available Liquidity</p>
            <p className="text-xs text-white sm:text-sm md:text-base">
              {totalLiquidityFormatted} {asset.underlyingToken.symbol}
            </p>
          </div>
          <div className="flex items-center justify-between py-2">
            <p className="text-xs text-gray-400 sm:text-sm md:text-base">% of Supply Borrowed</p>
            <p className="text-xs text-white sm:text-sm md:text-base">0%</p>
          </div>
        </div>
      </div>
      <TabButton
        text="Borrow"
        method={async () => await onBorrow(BigInt(inputValue * 10 ** asset.underlyingToken.decimals))}
        asset={asset}
        inputValue={inputValue}
        setInputValue={setInputValue}
        disabled={disabled}
      />
    </>
  );
};

export default BorrowTab;
