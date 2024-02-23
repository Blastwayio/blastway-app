'use client';
import React, { useState } from 'react';
import { useUserData } from '@/hooks/useUserData';
import { CToken } from '@/types';

import WithdrawTab from './tabs/WithdrawTab';
import BorrowTab from './tabs/BorrowTab';
import RepayTab from './tabs/RepayTab';
import SupplyTab from './tabs/SupplyTab';

interface LendingMainProps {
  asset: CToken;
  userData: ReturnType<typeof useUserData>;
}

const LendingMain: React.FC<LendingMainProps> = ({ asset, userData }) => {
  const { tokenData: userTokenData } = userData;

  const [activeTab, setActiveTab] = useState('Supply');

  const userDataAsset = userTokenData!.find(
    (userDataAsset: any) => userDataAsset.symbol.toLowerCase() === asset.symbol.toLowerCase()
  )!;

  const tabs = [
    {
      title: 'Supply',
      tab: <SupplyTab userDataAsset={userDataAsset} asset={asset} userData={userData} />,
    },
    {
      title: 'Withdraw',
      tab: <WithdrawTab userDataAsset={userDataAsset} asset={asset} userData={userData} />,
    },
    {
      title: 'Borrow',
      tab: <BorrowTab userDataAsset={userDataAsset} asset={asset} userData={userData} />,
    },
    {
      title: 'Repay',
      tab: <RepayTab userDataAsset={userDataAsset} asset={asset} userData={userData} />,
    },
  ];

  return (
    <>
      <div className="sm:flex-col-2 flex w-full flex-col space-y-4 sm:flex-row">
        <div className="mx-auto flex w-full flex-col rounded-xl border border-[#171717] bg-[#0E0E0E] px-2 py-4 sm:px-6 xl:w-8/12">
          <div className="flex w-full justify-between rounded-lg bg-[#161616] px-1 py-1.5 sm:px-1.5">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`w-1/4 ${
                  activeTab === tab.title ? 'bg-[#323232]' : 'text-[#8A8A8A]'
                } rounded py-2 text-xs text-white sm:text-sm`}
                onClick={() => setActiveTab(tab.title)}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {tabs.find((tab) => tab.title === activeTab)?.tab}
        </div>
      </div>
    </>
  );
};

export default LendingMain;
