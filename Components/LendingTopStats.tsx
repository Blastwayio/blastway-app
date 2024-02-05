'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Dropdown, Menu, Space } from 'antd';
import Arrow from '../Image/arrow.svg'
import Image from 'next/image';
import { useParams } from 'next/navigation';


interface Asset {
    name: string;
    symbol: string,
    image: string;
    deposited: string;
    borrowed: string;
    depositRate: string;
    borrowRate: string;
    maxLoop: string;
}
  
interface LendingTopAssetProps {
    assets: Asset[];
}

const LendingTopStats: React.FC<LendingTopAssetProps> = ({ assets }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currency, setCurrency] = useState<string>(assets[0].symbol);

    const params = useParams();
    const id = params.id;

    const menu = (
      <Menu onClick={(e) => setCurrency(e.key)}>
        {assets.map((asset, index) => (
          <Menu.Item key={asset.symbol} >
                <div className='flex items-center space-x-4'>
                    <img src={asset.image} alt={asset.name} className='rounded-full' width="24" height="24" />
                    <div className='w-full flex flex-col'>
                        <span className='text-white text-base'>{asset.symbol}</span>
                        <span className='text-[#838383] text-sm'>{asset.name}</span>
                    </div>
                </div>
          </Menu.Item>
        ))}
      </Menu>
    );
  
    const selectedAsset = assets.find(asset => asset.symbol === currency);
  

  return (
    <>
        <div className='hidden sm:flex w-full justify-between items-center bg-[#0E0E0E] border border-[#171717] rounded-xl pr-4'>
            
            <div className='bg-[#141414] py-6 rounded-l-xl text-white'>
                <Dropdown overlay={menu} trigger={['click']} >
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <Space>
                        {selectedAsset ? (
                            <div className='flex items-center justify-between space-x-8 px-4 w-60'>
                                <div className='flex items-center space-x-2'>
                                    <img src={selectedAsset.image} alt={selectedAsset.name} className='rounded-full' width="48" height="48" />
                                    <div className='w-full flex flex-col'>
                                        <span className='text-white text-base'>{selectedAsset.symbol}</span>
                                        <span className='text-[#838383] text-sm'>{selectedAsset.name}</span>
                                    </div>
                                </div>
                                <Image src={Arrow} alt='Arrow' />
                            </div>
                        ) : 'Select Asset'}
                    </Space>
                    </a>
                </Dropdown>
            </div>

                <div className='flex flex-col items-center py-6'>
                    <p className='text-[#838383] text-md'>Asset price</p>
                    <p className='text-white text-xl'>$2.21K</p>
                </div>

                <div className='flex flex-col items-center py-6'>
                    <p className='text-[#838383] text-md'>Borrow AYP</p>
                    <p className='text-white text-xl'>%9.76</p>
                </div>

                <div className='flex flex-col items-center py-6'>
                    <p className='text-[#838383] text-md'>Reserve size</p>
                    <p className='text-white text-xl'>36.72K</p>
                </div>

                <div className='flex flex-col items-center py-6'>
                    <p className='text-[#838383] text-md'>Utilization rate</p>
                    <p className='text-white text-xl'>69.86%</p>
                </div>
        </div> 

        <div className='sm:hidden space-y-4'>

            <div className='bg-[#141414] py-4 rounded-xl'>
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        {selectedAsset ? (
                                <div className='flex items-center justify-between px-2 w-full '>
                                    <div className='flex items-center space-x-2'>
                                        <img src={selectedAsset.image} alt={selectedAsset.name} className='rounded-full' width="48" height="48" />
                                        <div className='w-full flex flex-col'>
                                            <span className='text-white text-base'>{selectedAsset.symbol}</span>
                                            <span className='text-[#838383] text-sm'>{selectedAsset.name}</span>
                                        </div>
                                    </div>
                                    <Image src={Arrow} alt='Arrow' />
                                </div>
                        ) : 'Select Asset'}
                    </a>
                </Dropdown>
            </div>

            <div className='flex w-full justify-between items-center bg-[#0E0E0E] border border-[#171717] rounded-xl px-2'>
                    <div className='flex flex-col items-center py-6'>
                        <p className='text-[#838383] text-xs'>Asset price</p>
                        <p className='text-white text-base'>$2.21K</p>
                    </div>

                    <div className='flex flex-col items-center py-6'>
                        <p className='text-[#838383] text-xs'>Borrow AYP</p>
                        <p className='text-white text-base'>%9.76</p>
                    </div>

                    <div className='flex flex-col items-center py-6'>
                        <p className='text-[#838383] text-xs'>Reserve size</p>
                        <p className='text-white text-base'>36.72K</p>
                    </div>

                    <div className='flex flex-col items-center py-6'>
                        <p className='text-[#838383] text-xs'>Utilization rate</p>
                        <p className='text-white text-base'>69.86%</p>
                    </div>
            </div> 
        </div>
    </>
  )
}

export default LendingTopStats