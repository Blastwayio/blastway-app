"use client";
import React, { useState } from "react";
import { useUserData } from "@/hooks/useUserData";
import { CToken } from "@/types";

import WithdrawTab from "./tabs/WithdrawTab";
import BorrowTab from "./tabs/BorrowTab";
import RepayTab from "./tabs/RepayTab";
import SupplyTab from "./tabs/SupplyTab";
import SupplyTabLoading from "./tabs/SupplyTab";
import WithdrawTabLoading from "./tabs/WithdrawTab";
import BorrowTabLoading from "./tabs/BorrowTab";
import RepayTabLoading from "./tabs/RepayTab";

interface LendingMainProps {
  asset: CToken;
  userData: ReturnType<typeof useUserData>;
}

const LendingMain: React.FC<LendingMainProps> = ({ asset, userData }) => {
  const { tokenData: userTokenData } = userData;

  const [activeTab, setActiveTab] = useState("Supply");

  const userDataAsset = userTokenData!.find(
    (userDataAsset: any) =>
      userDataAsset.symbol.toLowerCase() === asset.symbol.toLowerCase()
  )!;

  const tabs = [
    {
      title: "Supply",
      tab: (
        <SupplyTab
          userDataAsset={userDataAsset}
          asset={asset}
          userData={userData}
        />
      ),
    },
    {
      title: "Withdraw",
      tab: (
        <WithdrawTab
          userDataAsset={userDataAsset}
          asset={asset}
          userData={userData}
        />
      ),
    },
    {
      title: "Borrow",
      tab: (
        <BorrowTab
          userDataAsset={userDataAsset}
          asset={asset}
          userData={userData}
        />
      ),
    },
    {
      title: "Repay",
      tab: (
        <RepayTab
          userDataAsset={userDataAsset}
          asset={asset}
          userData={userData}
        />
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:flex-col-2 w-full space-y-4">
        <div className="bg-[#0E0E0E] w-full sm:w-8/12 px-2 sm:px-6 py-4 rounded-xl mx-auto border border-[#171717] flex flex-col">
          <div className="w-full flex justify-between bg-[#161616] py-1.5 px-1 sm:px-1.5 rounded-lg">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`w-1/4 ${
                  activeTab === tab.title ? "bg-[#323232]" : "text-[#8A8A8A]"
                } py-2 rounded text-white text-xs sm:text-sm`}
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
