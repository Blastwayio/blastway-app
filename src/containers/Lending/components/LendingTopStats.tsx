'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Dropdown, Menu, Space } from 'antd';
import Arrow from '/public/images/arrow.svg';
import Image from 'next/image';
import { CToken } from '@/types';
import assets from '@/config/constants/assets';

interface LendingTopAssetProps {
  asset: CToken;
}

const CustomMenu = ({ asset }: LendingTopAssetProps) => (
  <Menu defaultValue={asset.underlyingToken.symbol}>
    {assets.map((asset) => (
      <Menu.Item key={asset.underlyingToken.symbol}>
        <Link href={`/lending?asset=${asset.underlyingToken.symbol}`}>
          <div className="flex items-center space-x-4">
            <Image src={asset.image} alt={asset.name} className="rounded-full" width="24" height="24" />
            <div className="flex w-full flex-col">
              <span className="text-base text-white">{asset.underlyingToken.symbol}</span>
              <span className="text-sm text-[#838383]">{asset.name}</span>
            </div>
          </div>
        </Link>
      </Menu.Item>
    ))}
  </Menu>
);

const LendingTopStats: React.FC<LendingTopAssetProps> = ({ asset }) => {
  const priceFormatted = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(+asset.underlyingToken.price);

  return (
    <>
      <div className="hidden w-full items-center gap-20 rounded-xl border border-[#171717] bg-[#0E0E0E] lg:flex">
        <div className="cursor-pointer rounded-l-xl bg-[#141414] py-6 text-white">
          <Dropdown overlay={() => CustomMenu({ asset })} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <Space>
                {asset ? (
                  <div className="flex items-center justify-between gap-16 px-5">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={asset.image}
                        alt={asset.name}
                        className="h-12 w-12 select-none rounded-full"
                        draggable="false"
                      />
                      <div className="flex w-full flex-col">
                        <span className="text-base text-white">{asset.underlyingToken.symbol}</span>
                        <span className="text-sm text-[#838383]">{asset.name}</span>
                      </div>
                    </div>
                    <Image src={Arrow} alt="Arrow" className="mx-5" />
                  </div>
                ) : (
                  'Select Asset'
                )}
              </Space>
            </a>
          </Dropdown>
        </div>
        <div className="mx-auto flex w-full justify-between gap-5 pr-16">
          <div className="flex flex-col items-center py-6">
            <p className="text-md text-[#838383]">Asset price</p>
            <p className="text-xl text-white">{priceFormatted}</p>
          </div>

          <div className="flex flex-col items-center py-6">
            <p className="text-md text-[#838383]">Borrow APY</p>
            <p className="text-xl text-white">{asset.borrowApy}%</p>
          </div>

          <div className="flex flex-col items-center py-6">
            <p className="text-md text-[#838383]">Supply APY</p>
            <p className="text-xl text-white">{asset.supplyApy}%</p>
          </div>
        </div>

        {/*         <div className="flex flex-col items-center py-6">
          <p className="text-[#838383] text-md">Reserve size</p>
          <p className="text-white text-xl">36.72K</p>
        </div>

        <div className="flex flex-col items-center py-6">
          <p className="text-[#838383] text-md">Utilization rate</p>
          <p className="text-white text-xl">69.86%</p>
        </div> */}
      </div>

      <div className="space-y-4 lg:hidden">
        <div className="rounded-xl bg-[#141414] py-4">
          <Dropdown overlay={() => CustomMenu({ asset })} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              {asset ? (
                <div className="flex w-full items-center justify-between px-2 ">
                  <div className="flex items-center space-x-2">
                    <Image src={asset.image} alt={asset.name} className="rounded-full" width="48" height="48" />
                    <div className="flex w-full flex-col">
                      <span className="text-base text-white">{asset.underlyingToken.symbol}</span>
                      <span className="text-sm text-[#838383]">{asset.name}</span>
                    </div>
                  </div>
                  <Image src={Arrow} alt="Arrow" />
                </div>
              ) : (
                'Select Asset'
              )}
            </a>
          </Dropdown>
        </div>

        <div className="flex w-full items-center justify-center gap-8 rounded-xl border border-[#171717] bg-[#0E0E0E] px-2">
          <div className="flex flex-col items-center py-6">
            <p className="text-xs text-[#838383]">Asset price</p>
            <p className="text-base text-white">$2.21K</p>
          </div>

          <div className="flex flex-col items-center py-6">
            <p className="text-xs text-[#838383]">Borrow AYP</p>
            <p className="text-base text-white">%9.76</p>
          </div>

          {/*           <div className="flex flex-col items-center py-6">
            <p className="text-[#838383] text-xs">Reserve size</p>
            <p className="text-white text-base">36.72K</p>
          </div>

          <div className="flex flex-col items-center py-6">
            <p className="text-[#838383] text-xs">Utilization rate</p>
            <p className="text-white text-base">69.86%</p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default LendingTopStats;
