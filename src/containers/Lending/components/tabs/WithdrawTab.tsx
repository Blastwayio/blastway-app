import { useUserData } from '@/hooks/useUserData';
import useWithdraw from '@/hooks/useWithdraw';
import { CToken } from '@/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TabButton from './TabButton';
import ValueSlider from '@/components/ValueSlider';

interface WithdrawTabProps {
  userDataAsset: any;
  asset: CToken;
  userData: ReturnType<typeof useUserData>;
}

const WithdrawTab: React.FC<WithdrawTabProps> = ({ userDataAsset, asset, userData }) => {
  const { borrowLimit, borrowPercentage, totalBorrowBalance } = userData;

  const [inputValue, setInputValue] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [warningText, setWarningText] = useState('');

  const { onWithdraw } = useWithdraw(asset.address);

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
      setWarningText('');
    }
  }, [inputValue, userDataAsset.supplyBalance]);

  return (
    <>
      <div className="mt-8 w-full">
        <div className="flex justify-between">
          <p className="px-1 py-2 text-xs text-[#C3C3C3] sm:text-sm md:text-base">Withdraw</p>
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
          maxValue={userDataAsset.supplyBalance}
        />
        {warningText && <p className="mt-4 text-center text-yellow-600">{warningText}</p>}

        <div className="w-full rounded-lg bg-[#141414] p-4">
          <div className="flex items-center justify-between py-2">
            <p className="text-xs text-gray-400 sm:text-sm md:text-base">Max Withdrawal</p>

            {/* @todo: Set the value of the max withdrawal */}
            <p className="text-xs text-white sm:text-sm md:text-base">0 {asset.underlyingToken.symbol}</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <p className="text-xs text-gray-400 sm:text-sm md:text-base">Amount Supplied</p>
            <div className="flex gap-2">
              <p className="text-xs text-white sm:text-sm md:text-base">
                {userDataAsset.supplyBalance.toFixed(4)} {asset.underlyingToken.symbol}{' '}
              </p>
              {!!inputValue && (
                <p className="text-xs text-red-700 sm:text-sm md:text-base">
                  {'->'} {newAmountSupplied.toFixed(4)} {asset.underlyingToken.symbol}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <p className="text-xs text-gray-400 sm:text-sm md:text-base">Borrow Limit</p>
            <div className="flex gap-2">
              <p className="text-xs text-white sm:text-sm md:text-base">${borrowLimit?.toFixed(2)}</p>
              {!!inputValue && (
                <p className="text-xs text-red-700 sm:text-sm md:text-base">
                  {'->'} ${newBorrowLimit.toFixed(4)}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <p className="text-xs text-gray-400 sm:text-sm md:text-base">Borrow Utilization</p>
            <div className="flex gap-2">
              <p className="text-xs text-white sm:text-sm md:text-base">{borrowPercentage!.toFixed(2)}%</p>
              {!!inputValue && (
                <p className="text-xs text-red-700 sm:text-sm md:text-base">
                  {'->'} {newBorrowUtilization.toFixed(2)}%
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <p className="text-xs text-gray-400 sm:text-sm md:text-base">Supply APY</p>
            <p className="text-xs text-white sm:text-sm md:text-base">{asset.supplyApy}%</p>
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
