"use client";

import React from "react";
import { MdNavigateNext } from "react-icons/md";
import { FaCircle } from "react-icons/fa";

const UserStats = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center w-full gap-0 sm:gap-6 px-4 container mx-auto mt-12">
        {/* Market Overview Card */}
        <div className="bg-[#1E2022] border border-[#2E2F31] rounded-2xl px-4 w-full sm:w-3/12 mb-4 sm:mb-0">
          <div className="border-b border-[#2E2F31] px-4 py-4">
            <p className="text-md text-white">Market Overview</p>
          </div>
          <div className="border-b border-[#2E2F31] py-0 sm:py-2">
            <div className="spacep-y-2 text-white px-4 py-2 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start">
              <p className="text-sm text-gray-200">Total Supplied</p>
              <p className="text-md py-1">$ 2,906,024.36</p>
            </div>
          </div>
          <div className="border-b border-[#2E2F31] py-0 sm:py-2">
            <div className="spacep-y-2 text-white px-4 py-2 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start">
              <p className="text-sm text-gray-200">Total Borrowed</p>
              <p className="text-md py-1">$ 407,397.78</p>
            </div>
          </div>
          <div className="py-0 sm:py-2">
            <div className="spacep-y-2 text-white px-4 py-2 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start">
              <p className="text-sm text-gray-200">Available Liquidity</p>
              <p className="text-md py-1">$ 2,498,626.57</p>
            </div>
          </div>
        </div>

        {/* My Account Card */}
        <div className="w-full sm:w-9/12 space-y-4 sm:space-y-8">
          <div className="bg-[#1E2022] border border-[#2E2F31] rounded-2xl px-4">
            <div className="flex items-center text-white border-b border-[#2E2F31] px-4 py-4">
              <p className="text-md text-white">My Account</p>
              <MdNavigateNext size={20} />
            </div>

            <div className="flex items-center text-white px-4 py-6">
              <div className="flex flex-col space-y-1 sm:flex-row w-full mx-auto justify-between items-center">
                {/* Supplied Card */}
                <div className="flex flex-row sm:flex-col items-center justify-between w-full sm:w-1/3">
                  <h1 className="text-gray-300 text-md sm:text-xl text-center">Supplied</h1>
                  <h1 className="text-white text-lg sm:text-3xl text-center">$ 0.00</h1>
                </div>

                {/* Borrowed Card */}
                <div className="flex flex-row sm:flex-col items-center justify-between w-full sm:w-1/3">
                  <h1 className="text-gray-300 text-md sm:text-xl text-center">Borrowed</h1>
                  <h1 className="text-white text-lg sm:text-3xl text-center">$ 0.00</h1>
                </div>

                {/* Net APY Card */}
                <div className="flex flex-row sm:flex-col items-center justify-between w-full sm:w-1/3">
                  <h1 className="text-gray-300 text-md sm:text-xl text-center">Net APY</h1>
                  <h1 className="text-[#3730AD] text-lg sm:text-3xl text-center">0 %</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Borrow Limit & Liquidation Risk Cards */}
          <div className="flex flex-col sm:flex-row w-full items-center gap-4">
            <div className="w-full sm:w-3/4 bg-[#1E2022] border border-[#2E2F31] rounded-2xl py-3 px-8">
              <div className="flex justify-between items-center text-white py-4">
                <p className="text-md text-white">Borrow Limit</p>
                <p className="text-md text-white">$ 0.00 | Used 0.00%</p>
              </div>
              <div className="border-b-4 border-[#121417] mb-4"></div>
              {/* Borrow Limit content */}
            </div>

            <div className="flex flex-row sm:flex-col space-x-4 sm:space-x-0 justify-between w-full sm:w-1/4 bg-[#1E2022] border border-[#2E2F31] rounded-2xl px-6 py-4">
              <div className="flex items-center text-white py-2">
                <p className="text-md text-white">Liquidation Risk</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <FaCircle size={20} color="#463ED3" />
                  <FaCircle size={20} color="#121417" />
                  <FaCircle size={20} color="#121417" />
                  <FaCircle size={20} color="#121417" />
                </div>
                <h1 className="text-lg text-[#463ED3]">SAFE</h1>
              </div>
              {/* Liquidation Risk content */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const UserStatsSkeleton = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center w-full gap-0 sm:gap-6 px-4 container mx-auto mt-12">
        {/* Market Overview Card */}
        <div className="bg-[#1E2022] border border-[#2E2F31] rounded-2xl px-4 w-full sm:w-3/12 mb-4 sm:mb-0">
          <div className="border-b border-[#2E2F31] px-4 py-4">
            <p className="text-md text-white">Market Overview</p>
          </div>
          <div className="border-b border-[#2E2F31] py-0 sm:py-2">
            <div className="spacep-y-2 text-white px-4 py-2 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start">
              <p className="text-sm text-gray-200">Total Supplied</p>
              <p className="text-md py-1">$ 2,906,024.36</p>
            </div>
          </div>
          <div className="border-b border-[#2E2F31] py-0 sm:py-2">
            <div className="spacep-y-2 text-white px-4 py-2 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start">
              <p className="text-sm text-gray-200">Total Borrowed</p>
              <p className="text-md py-1">$ 407,397.78</p>
            </div>
          </div>
          <div className="py-0 sm:py-2">
            <div className="spacep-y-2 text-white px-4 py-2 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start">
              <p className="text-sm text-gray-200">Available Liquidity</p>
              <p className="text-md py-1">$ 2,498,626.57</p>
            </div>
          </div>
        </div>

        {/* My Account Card */}
        <div className="w-full sm:w-9/12 space-y-4 sm:space-y-8">
          <div className="bg-[#1E2022] border border-[#2E2F31] rounded-2xl px-4">
            <div className="flex items-center text-white border-b border-[#2E2F31] px-4 py-4">
              <p className="text-md text-white">My Account</p>
              <MdNavigateNext size={20} />
            </div>

            <div className="flex items-center text-white px-4 py-6">
              <div className="flex flex-col space-y-1 sm:flex-row w-full mx-auto justify-between items-center">
                {/* Supplied Card */}
                <div className="flex flex-row sm:flex-col items-center justify-between w-full sm:w-1/3">
                  <h1 className="text-gray-300 text-md sm:text-xl text-center">Supplied</h1>
                  <h1 className="text-white text-lg sm:text-3xl text-center">$ 0.00</h1>
                </div>

                {/* Borrowed Card */}
                <div className="flex flex-row sm:flex-col items-center justify-between w-full sm:w-1/3">
                  <h1 className="text-gray-300 text-md sm:text-xl text-center">Borrowed</h1>
                  <h1 className="text-white text-lg sm:text-3xl text-center">$ 0.00</h1>
                </div>

                {/* Net APY Card */}
                <div className="flex flex-row sm:flex-col items-center justify-between w-full sm:w-1/3">
                  <h1 className="text-gray-300 text-md sm:text-xl text-center">Net APY</h1>
                  <h1 className="text-[#3730AD] text-lg sm:text-3xl text-center">0 %</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Borrow Limit & Liquidation Risk Cards */}
          <div className="flex flex-col sm:flex-row w-full items-center gap-4">
            <div className="w-full sm:w-3/4 bg-[#1E2022] border border-[#2E2F31] rounded-2xl py-3 px-8">
              <div className="flex justify-between items-center text-white py-4">
                <p className="text-md text-white">Borrow Limit</p>
                <p className="text-md text-white">$ 0.00 | Used 0.00%</p>
              </div>
              <div className="border-b-4 border-[#121417] mb-4"></div>
              {/* Borrow Limit content */}
            </div>

            <div className="flex flex-row sm:flex-col space-x-4 sm:space-x-0 justify-between w-full sm:w-1/4 bg-[#1E2022] border border-[#2E2F31] rounded-2xl px-6 py-4">
              <div className="flex items-center text-white py-2">
                <p className="text-md text-white">Liquidation Risk</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <FaCircle size={20} color="#463ED3" />
                  <FaCircle size={20} color="#121417" />
                  <FaCircle size={20} color="#121417" />
                  <FaCircle size={20} color="#121417" />
                </div>
                <h1 className="text-lg text-[#463ED3]">SAFE</h1>
              </div>
              {/* Liquidation Risk content */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserStats;
