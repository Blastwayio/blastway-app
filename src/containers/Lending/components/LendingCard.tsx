import React from 'react';

type Props = {};

const LendingCard = (props: Props) => {
  return (
    <>
      <div className="hidden w-full space-y-4 sm:block sm:w-1/3">
        <div className="rounded-xl border border-[#171717] bg-[#0E0E0E] py-8 pl-16 pr-6 text-right">
          <h1 className="text-3xl font-bold text-[#FFFFFF]/75 sm:text-4xl">0%</h1>
          <p className="text-lg text-[#6E6E6E] sm:text-xl">Max APR on locked dLP</p>
        </div>
        <div className="rounded-xl border border-[#171717] bg-[#0E0E0E] py-8 pl-16 pr-6 text-right">
          <h1 className="text-3xl font-bold text-[#FFFFFF]/75 sm:text-4xl">0%</h1>
          <p className="text-lg text-[#6E6E6E] sm:text-xl">Max APR on locked dLP</p>
        </div>
      </div>

      <div className="w-full rounded-xl border border-[#171717] bg-[#0E0E0E] sm:hidden">
        <div className="flex w-full items-center justify-between border-b border-[#171717] px-4 py-4">
          <p className="text-md text-[#6E6E6E]">Max APR on locked dLP</p>
          <h1 className="text-xl text-[#FFFFFF]/75">0%</h1>
        </div>
        <div className="flex w-full items-center justify-between px-4 py-4">
          <p className="text-md text-[#6E6E6E]">Max APR on locked dLP</p>
          <h1 className="text-xl text-[#FFFFFF]/75">0%</h1>
        </div>
      </div>
    </>
  );
};

export default LendingCard;
