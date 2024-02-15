"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Dropdown, Menu, Space } from "antd";
import Arrow from "/public/images/arrow.svg";
import Image from "next/image";
import { CToken } from "@/types";
import assets from "@/config/constants/assets";

import { useUserData } from "@/hooks/useUserData";
import BorrowTabLoading from "@/containers/Lending/components/tabs/loadings/BorrowTabLoading";
import RepayTabLoading from "@/containers/Lending/components/tabs/loadings/RepayTabLoading";
import SupplyTabLoading from "@/containers/Lending/components/tabs/loadings/SupplyTabLoading";
import WithdrawTabLoading from "@/containers/Lending/components/tabs/loadings/WithdrawTabLoading";

interface LendingMainProps {
  asset: CToken;
  userData: ReturnType<typeof useUserData>;
}

interface LendingTopAssetProps {
  asset: CToken;
}

const CustomMenu = ({ asset }: LendingTopAssetProps) => (
  <Menu defaultValue={asset.underlyingToken.symbol}>
    {assets.map((asset) => (
      <Menu.Item key={asset.underlyingToken.symbol}>
        <Link href={`/lending?asset=${asset.underlyingToken.symbol}`}>
          <div className="flex items-center space-x-4">
            <Image
              src={asset.image}
              alt={asset.name}
              className="rounded-full"
              width="24"
              height="24"
            />
            <div className="w-full flex flex-col">
              <span className="text-white text-base">
                {asset.underlyingToken.symbol}
              </span>
              <span className="text-[#838383] text-sm">{asset.name}</span>
            </div>
          </div>
        </Link>
      </Menu.Item>
    ))}
  </Menu>
);

const LendingLoading: React.FC<LendingMainProps> = ({ asset, userData }) => {
  console.log("asset", asset);

  const { tokenData: userTokenData } = userData;

  const [activeTab, setActiveTab] = useState("Supply");

  const userDataAsset = userTokenData!.find(
    (userDataAsset: any) =>
      userDataAsset.symbol.toLowerCase() === asset.symbol.toLowerCase()
  )!;

  const tabs = [
    {
      title: "Supply",
      tab: <SupplyTabLoading asset={asset} />,
    },
    {
      title: "Withdraw",
      tab: <WithdrawTabLoading asset={asset} />,
    },
    {
      title: "Borrow",
      tab: <BorrowTabLoading asset={asset} />,
    },
    {
      title: "Repay",
      tab: <RepayTabLoading asset={asset} />,
    },
  ];

  return (
    <main className="px-4 py-4 sm:px-10 sm:ml-60 sm:align-center space-y-4">
      <div className="hidden lg:flex w-full gap-20 items-center bg-[#0E0E0E] border border-[#171717] rounded-xl">
        <div className="bg-[#141414] py-6 rounded-l-xl text-white cursor-pointer">
          <Dropdown overlay={() => CustomMenu({ asset })} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <Space>
                {asset ? (
                  <div className="flex items-center justify-between px-5 gap-16">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={asset.image}
                        alt={asset.name}
                        className="rounded-full w-12 h-12 select-none"
                        draggable="false"
                      />
                      <div className="w-full flex flex-col">
                        <span className="text-white text-base">
                          {asset.underlyingToken.symbol}
                        </span>
                        <span className="text-[#838383] text-sm">
                          {asset.name}
                        </span>
                      </div>
                    </div>
                    <Image src={Arrow} alt="Arrow" className="mx-5" />
                  </div>
                ) : (
                  "Select Asset"
                )}
              </Space>
            </a>
          </Dropdown>
        </div>
        <div className="flex w-full justify-between pr-16 gap-5 mx-auto">
          <div className="flex flex-col items-center py-6 ">
            <p className="text-[#838383] text-md">Asset price</p>
            <div className="h-7 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-3/4"></div>
          </div>

          <div className="flex flex-col items-center py-6 ">
            <p className="text-[#838383] text-md">Borrow APY</p>
            <div className="h-7 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-3/4"></div>
          </div>

          <div className="flex flex-col items-center py-6 ">
            <p className="text-[#838383] text-md">Supply APY</p>
            <div className="h-7 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>

      <div className="lg:hidden space-y-4">
        <div className="bg-[#141414] py-4 rounded-xl">
          <Dropdown overlay={() => CustomMenu({ asset })} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {asset ? (
                <div className="flex items-center justify-between px-2 w-full ">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={asset.image}
                      alt={asset.name}
                      className="rounded-full"
                      width="48"
                      height="48"
                    />
                    <div className="w-full flex flex-col">
                      <span className="text-white text-base">
                        {asset.underlyingToken.symbol}
                      </span>
                      <span className="text-[#838383] text-sm">
                        {asset.name}
                      </span>
                    </div>
                  </div>
                  <Image src={Arrow} alt="Arrow" />
                </div>
              ) : (
                "Select Asset"
              )}
            </a>
          </Dropdown>
        </div>

        <div className="flex w-full justify-center gap-8 items-center bg-[#0E0E0E] border border-[#171717] rounded-xl px-2">
          <div className="flex flex-col items-center py-6">
            <p className="text-[#838383] text-xs">Asset price</p>
            <div className="h-6 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-full"></div>
          </div>

          <div className="flex flex-col items-center py-6">
            <p className="text-[#838383] text-xs">Borrow APY</p>
            <div className="h-6 bg-gray-400 bg-opacity-40 rounded-full animate-pulse w-full"></div>
          </div>
        </div>
      </div>
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
    </main>
  );
};

export default LendingLoading;
