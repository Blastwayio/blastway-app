import ValueSlider from '@/components/ValueSlider';
import useRepay from '@/hooks/useRepay';
import { useUserData } from '@/hooks/useUserData';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TabButton from './TabButton';

interface RepayTabProps {
  userDataAsset: any;
  asset: any;
  userData: ReturnType<typeof useUserData>;
}

const RepayTab: React.FC<RepayTabProps> = ({ userDataAsset, asset, userData }) => {
  const { borrowPercentage, totalBorrowBalance } = userData;

  const [inputValue, setInputValue] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [warningText, setWarningText] = useState('');

  const { onRepay } = useRepay(asset.address);

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

  const handleInputChange = (value: number) => {
    setInputValue(value);
  };

  useEffect(() => {
    if (inputValue > userDataAsset.borrowBalance) {
      setDisabled(true);
      setWarningText("You can't repay more than you borrowed.");
    } else {
      setDisabled(false);
      setWarningText('');
    }
  }, [inputValue, userDataAsset.borrowBalance]);

  return (
    <>
      <div className="mt-8 w-full">
        <div className="flex justify-between">
          <p className="px-1 py-2 text-xs text-[#C3C3C3] sm:text-sm md:text-base">Repay</p>
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
        <ValueSlider
          value={inputValue}
          onChange={(value) => handleInputChange(value)}
          maxValue={userDataAsset.borrowBalance}
        />
        {warningText && <p className="mt-4 text-center text-yellow-600">{warningText}</p>}
        <div className="w-full rounded-lg bg-[#141414] p-4">
          <div className="flex items-center justify-between py-2">
            <p className="text-xs text-gray-400 sm:text-sm md:text-base">Wallet Balance</p>
            <p className="text-xs text-white sm:text-sm md:text-base">
              {userDataAsset.underlyingBalance.toFixed(4)} {asset.underlyingToken.symbol}
            </p>
          </div>
          <div className="flex items-center justify-between py-2">
            <p className="text-xs text-gray-400 sm:text-sm md:text-base">Total Borrow Balance</p>
            <p className="text-xs text-white sm:text-sm md:text-base">${totalBorrowBalance}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <p className="text-xs text-gray-400 sm:text-sm md:text-base">Borrow Utilization</p>
            <p className="text-xs text-white sm:text-sm md:text-base">{borrowPercentage!.toFixed(2)}%</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <p className="text-xs text-gray-400 sm:text-sm md:text-base">Borrow APY</p>
            <p className="text-xs text-white sm:text-sm md:text-base">{asset.borrowApy}%</p>
          </div>
        </div>
      </div>
      <TabButton
        text="Repay"
        method={async () => await onRepay(BigInt(inputValue * 10 ** asset.underlyingToken.decimals))}
        asset={asset}
        inputValue={inputValue}
        setInputValue={setInputValue}
        disabled={disabled}
      />
    </>
  );
};

export default RepayTab;
