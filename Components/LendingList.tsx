import React from 'react'
import Arrow from '../Image/arrow.svg'
import Image from 'next/image'
import Link from 'next/link';

interface Asset {
    name: string;
    image: string;
    deposited: string;
    borrowed: string;
    depositRate: string;
    borrowRate: string;
    maxLoop: string;
}
  
interface LendingListProps {
    assets: Asset[];
}

const LendingList: React.FC<LendingListProps> = ({ assets }) => {
    return (
    <div className="mt-8 px-0 sm:px-4 w-full container mx-auto">

    <div className="hidden sm:grid bg-[#0e0e0e] border border-[#232323] rounded-xl shadow-lg">
        <div className="bg-[#141414] text-[#848484] border-b border-[#232323] rounded-t-xl grid grid-cols-4 py-6 px-8">
            <div className='flex justify-left items-center space-x-1'>
                <span>Assets</span>
                <Image src={Arrow} alt='arrow' />
            </div>
            <div className='flex justify-center items-center space-x-1'>
                <span>Deposit %</span>
                <Image src={Arrow} alt='arrow' />
            </div>
            <div className='flex justify-center items-center space-x-1'>
                <span>Borrow %</span>
                <Image src={Arrow} alt='arrow' />
            </div>
            <div className='flex justify-center items-center space-x-1'>
                <span>Max loop %</span>
                <Image src={Arrow} alt='arrow' />
            </div>
        </div>

        {assets.map((asset, index) => (
        <Link href={`/lending/${asset.name}`} key={index} className="grid grid-cols-4 py-4 px-2 text-sm text-white items-center border-b border-[#232323] hover:bg-[#141414] transition-colors duration-300">
            <div className="col-span-1 items-center text-center">
                <div className='flex gap-3 items-center text-left ml-6'>
                        <img src={asset.image} alt={asset.name} style={{ width: '38px', height: '38px' }}  />
                    <div>
                        <p className='text-md'>{asset.name}</p>
                        <p className='text-[#848484] text-sm'>Deposited: {asset.deposited}</p>
                        <p className='text-[#848484] text-sm'>Borrowed: {asset.borrowed}</p>
                    </div>
                </div>
            </div>
            <div className="col-span-1 items-center text-center"><p className='text-lg'>{asset.depositRate}</p></div>
            <div className="col-span-1 items-center text-center"><p className='text-lg'>{asset.borrowRate}</p></div>
            <div className="col-span-1 items-center text-center"><p className='text-lg'>{asset.maxLoop}</p></div>
        </Link>
        ))}

    </div>

    <div className='flex flex-col sm:hidden'>
        <div className='text-gray-200 border-b border-[#2E2F31] w-full py-4'>
            <p className='px-5 text-md'>Assets to Supply & Borrow</p>
        </div>

        {assets.map((asset, index) => (
        <Link href={`/lending/${asset.name}`} key={index} className="py-4 text-sm text-white items-center border-b border-[#232323] hover:bg-[#141414] transition-colors duration-300">
            <div className="col-span-1 items-center text-center px-2">
                <div className='flex gap-3 items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                        <img src={asset.image} alt={asset.name} style={{ width: '38px', height: '38px' }}  />
                        <p className='text-md'>{asset.name}</p>
                    </div>
                    <div className='flex justify-end space-x-4'>
                        <p className='text-[#848484] text-sm'>Deposited: {asset.deposited}</p>
                        <p className='text-[#848484] text-sm'>Borrowed: {asset.borrowed}</p>
                    </div>
                </div>
            </div>
        </Link>
        ))}

        
    </div>
</div>
  )
}

export default LendingList