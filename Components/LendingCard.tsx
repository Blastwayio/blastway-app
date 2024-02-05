import React from 'react'

type Props = {}

const LendingCard = (props: Props) => {
  return (
    <>
      <div className='hidden sm:block space-y-4 w-full sm:w-1/3'>
        <div className='bg-[#0E0E0E] rounded-xl border border-[#171717] text-right pl-16 pr-6 py-8'>
            <h1 className='text-[#FFFFFF]/75 text-3xl sm:text-4xl font-bold'>0%</h1>
            <p className='text-[#6E6E6E] text-lg sm:text-xl'>Max APR on locked dLP</p>
        </div>
        <div className='bg-[#0E0E0E] rounded-xl border border-[#171717] text-right pl-16 pr-6 py-8'>
            <h1 className='text-[#FFFFFF]/75 text-3xl sm:text-4xl font-bold'>0%</h1>
            <p className='text-[#6E6E6E] text-lg sm:text-xl'>Max APR on locked dLP</p>
        </div>
      </div>

      <div className='sm:hidden w-full bg-[#0E0E0E] rounded-xl border border-[#171717]'>
        <div className='flex w-full justify-between px-4 py-4 items-center border-b border-[#171717]'>
            <p className='text-[#6E6E6E] text-md'>Max APR on locked dLP</p>
            <h1 className='text-[#FFFFFF]/75 text-xl'>0%</h1>
        </div>
        <div className='flex w-full justify-between px-4 py-4 items-center'>
            <p className='text-[#6E6E6E] text-md'>Max APR on locked dLP</p>
            <h1 className='text-[#FFFFFF]/75 text-xl'>0%</h1>
        </div>
      </div>
    </>
  )
}

export default LendingCard