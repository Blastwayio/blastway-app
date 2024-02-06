"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { FiAlertTriangle } from "react-icons/fi";
import type { CToken } from "@/types";
import { useUserData } from "@/hooks/useUserData";
import useEnterMarkets from "@/hooks/useEnterMarkets";
import useExitMarket from "@/hooks/useExitMarket";
import useSupply from "@/hooks/useSupply";
import useApprove from "@/hooks/useApprove";
import { useAccount } from "wagmi";
import ConnectButton from "@/components/ConnectButton";
import useWithdraw from "@/hooks/useWithdraw";
import useBorrow from "@/hooks/useBorrow";
import useRepay from "@/hooks/useRepay";

interface Props {
  cToken: CToken;
  userData: ReturnType<typeof useUserData>;
}

const ActionButton = ({ cToken, userData }: Props) => {
  const [selectedTab, setSelectedTab] = useState("supply");
  const [inputValue, setInputValue] = useState(0);
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { tokenData: userTokenData, borrowLimit: userBorrowLimit, totalBorrowBalance, borrowPercentage } = userData;

  const { address: account } = useAccount();

  const { onEnterMarkets } = useEnterMarkets([cToken.address]);
  const { onExitMarket } = useExitMarket(cToken.address);
  const { onSupply } = useSupply(cToken.address);
  const { onWithdraw } = useWithdraw(cToken.address);
  const { onBorrow } = useBorrow(cToken.address);
  const { onRepay } = useRepay(cToken.address);
  const { onApprove, isApproved } = useApprove(cToken.underlyingToken.address, cToken.address);

  const foundUserTokenData = userTokenData?.find((userToken) => userToken.address === cToken.address);
  const inputTokenPrice = inputValue * +cToken.underlyingToken.price;

  const totalLiquidityFormatted = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(+cToken.totalCash / 10 ** cToken.underlyingToken.decimals);

  useEffect(() => {
    if (foundUserTokenData?.isInMarket) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [foundUserTokenData?.isInMarket]);

  useEffect(() => {
    if (isApproved && inputValue === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [isApproved, inputValue]);

  const enterMarket = async () => {
    try {
      await onEnterMarkets();
      setChecked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const exitMarket = async () => {
    try {
      await onExitMarket();
      setChecked(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async () => {
    try {
      setDisabled(true);
      await onApprove();
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  };

  const handleSupply = async () => {
    try {
      setDisabled(true);
      console.log(
        `supplying ${(inputValue * 10 ** cToken.underlyingToken.decimals).toFixed(0)} ${cToken.underlyingToken.symbol}`
      );
      await onSupply((inputValue * 10 ** cToken.underlyingToken.decimals).toFixed(0));
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      setDisabled(true);
      console.log(
        `withdrawing ${(inputValue * 10 ** cToken.underlyingToken.decimals).toFixed(0)} ${
          cToken.underlyingToken.symbol
        }`
      );
      await onWithdraw((inputValue * 10 ** cToken.underlyingToken.decimals).toFixed(0));
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  };

  const handleBorrow = async () => {
    try {
      setDisabled(true);
      console.log(
        `borrowing ${(inputValue * 10 ** cToken.underlyingToken.decimals).toFixed(0)} ${cToken.underlyingToken.symbol}`
      );
      await onBorrow((inputValue * 10 ** cToken.underlyingToken.decimals).toFixed(0));
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  };

  const handleRepay = async () => {
    try {
      setDisabled(true);
      console.log(
        `repaying ${(inputValue * 10 ** cToken.underlyingToken.decimals).toFixed(0)} ${cToken.underlyingToken.symbol}`
      );
      await onRepay((inputValue * 10 ** cToken.underlyingToken.decimals).toFixed(0));
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  };

  console.log("cToken.totalSupply", +cToken.totalSupply * +cToken.oneCTokenInUnderlying);

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-[#3730AD] rounded-full text-white px-4 py-2 hover:from-red-600 hover:to-orange-600 transition-colors duration-300">
          Manage
        </Button>
      </DialogTrigger>
      <DialogContent className="modal">
        <div className="border-b border-[#2E2F31] py-5 bg-[#141618] rounded-t-3xl">
          <div className="flex justify-between px-6 ">
            <a
              onClick={() => setSelectedTab("supply")}
              className={`${selectedTab == "supply" ? "text-white" : "text-gray-400"} text-lg hover:text-gray-300`}
            >
              SUPPLY
            </a>
            <a
              onClick={() => setSelectedTab("withdraw")}
              className={`${selectedTab == "withdraw" ? "text-white" : "text-gray-400"} text-lg hover:text-gray-300`}
            >
              WITHDRAW
            </a>
            <a
              onClick={() => setSelectedTab("borrow")}
              className={`${selectedTab == "borrow" ? "text-white" : "text-gray-400"} text-lg hover:text-gray-300`}
            >
              BORROW
            </a>
            <a
              onClick={() => setSelectedTab("repay")}
              className={`${selectedTab == "repay" ? "text-white" : "text-gray-400"} text-lg hover:text-gray-300`}
            >
              REPAY
            </a>
          </div>
        </div>

        {selectedTab == "supply" ? (
          <>
            <div className="px-6 py-4">
              {/* <div className="flex justify-end gap-3">
                <a className="text-white text-md">25%</a>
                <a className="text-white text-md">50%</a>
                <a className="text-white text-md">75%</a>
                <a className="text-white text-md">MAX</a>
              </div> */}
              <div className="py-2">
                <div className="flex gap-4 items-center">
                  <input
                    type="number"
                    placeholder="0.00"
                    className="bg-transparent text-4xl text-white focus:outline-none w-full"
                    onChange={(e) => setInputValue(Number(e.target.value))}
                  />
                  <p className="text-white text-3xl">{cToken.underlyingToken.symbol}</p>
                </div>
                <div className="py-2">
                  <p className="text-white text-md"> =${inputTokenPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="py-2">
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Wallet Balance</p>
                  <p className="text-white text-md">
                    {foundUserTokenData?.underlyingBalance} {cToken.underlyingToken.symbol}
                  </p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Amount Supplied</p>
                  <p className="text-white text-md">
                    {foundUserTokenData?.supplyBalance} {cToken.underlyingToken.symbol}
                  </p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Use as Collateral</p>
                  <Switch checked={checked} onClick={checked ? exitMarket : enterMarket} className="bg-[#343638]" />
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Loan-To-Value</p>
                  <p className="text-white text-md">{+cToken.collateralFactor * 100}%</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Borrow Limit</p>
                  <p className="text-white text-md">${userBorrowLimit?.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Supply APY</p>
                  <p className="text-white text-md">{cToken.supplyApy}%</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Total Supply</p>
                  <p className="text-white text-md">$ 634.2K</p>
                </div>
              </div>
              <div className="py-2 px-4 bg-[#191207] w-full rounded-xl">
                <div className="flex justify-between gap-4 py-2">
                  <div>
                    <FiAlertTriangle color="#E99824" size={25} />
                  </div>
                  <div>
                    <p className="text-[#F1D5AC] text-sm font-light">
                      Metamask overestimates the tx fees by 50-90%. Unused gas (tx fee) automatically gets refunded
                      after successful transaction.
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-4">
                {!account ? (
                  <ConnectButton />
                ) : (
                  <button
                    disabled={disabled}
                    className="bg-[#3730AD] text-white text-lg rounded-full w-full disabled:bg-[#2E3031] disabled:text-[#6D6F6F] px-4 py-4"
                    onClick={isApproved ? handleSupply : handleApprove}
                  >
                    {isApproved ? "Supply" : "Approve"}
                  </button>
                )}
              </div>
            </div>
          </>
        ) : null}

        {selectedTab == "withdraw" ? (
          <>
            <div className="px-6 py-4">
              {/* <div className="flex justify-end gap-3">
                <a className="text-white text-md">MAX</a>
              </div> */}
              <div className="py-2">
                <div className="flex gap-4 items-center">
                  <input
                    type="number"
                    placeholder="0.00"
                    onChange={(e) => setInputValue(Number(e.target.value))}
                    className="bg-transparent text-4xl text-white focus:outline-none w-full"
                  />
                  <p className="text-white text-3xl">{cToken.underlyingToken.symbol}</p>
                </div>
                <div className="py-2">
                  <p className="text-white text-md"> =${inputTokenPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="py-2">
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Max Withdrawal</p>
                  <p className="text-white text-md">0 {cToken.underlyingToken.symbol}</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Amount Supplied</p>
                  <p className="text-white text-md">
                    {foundUserTokenData?.supplyBalance} {cToken.underlyingToken.symbol}
                  </p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Borrow Limit</p>
                  <p className="text-white text-md">${userBorrowLimit?.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Borrow Utilization</p>
                  <p className="text-white text-md">{borrowPercentage.toFixed(2)}%</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Supply APY</p>
                  <p className="text-white text-md">{cToken.supplyApy}%</p>
                </div>
              </div>

              <div className="py-4">
                {!account ? (
                  <ConnectButton />
                ) : (
                  <button
                    disabled={disabled}
                    className="bg-[#3730AD] text-white text-lg rounded-full w-full disabled:bg-[#2E3031] disabled:text-[#6D6F6F] px-4 py-4"
                    onClick={isApproved ? handleWithdraw : handleApprove}
                  >
                    {isApproved ? "Withdraw" : "Approve"}
                  </button>
                )}
              </div>
            </div>
          </>
        ) : null}

        {selectedTab == "borrow" ? (
          <>
            <div className="px-6 py-4">
              {/* <div className="flex justify-end gap-3">
                <a className="text-white text-md">SAFE MAX</a>
              </div> */}
              <div className="py-2">
                <div className="flex gap-4 items-center">
                  <input
                    type="number"
                    placeholder="0.00"
                    onChange={(e) => setInputValue(Number(e.target.value))}
                    className="bg-transparent text-4xl text-white focus:outline-none w-full"
                  />
                  <p className="text-white text-3xl">{cToken.underlyingToken.symbol}</p>
                </div>
                <div className="py-2">
                  <p className="text-white text-md"> =${inputTokenPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="py-2">
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Total Borrow Balance</p>
                  <p className="text-white text-md">${totalBorrowBalance}</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Borrow Limit</p>
                  <p className="text-white text-md">${userBorrowLimit?.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Use as Collateral</p>
                  <Switch checked={checked} onClick={checked ? exitMarket : enterMarket} className="bg-[#343638]" />
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Borrow Utilization</p>
                  <p className="text-white text-md">{borrowPercentage.toFixed(2)}%</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Borrow APY</p>
                  <p className="text-white text-md">{cToken.borrowApy}%</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Available Liquidity</p>
                  <p className="text-white text-md">
                    {totalLiquidityFormatted} {cToken.underlyingToken.symbol}
                  </p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">% of Supply Borrowed</p>
                  <p className="text-white text-md">0%</p>
                </div>
              </div>
              <div className="py-2 px-4 bg-[#191207] w-full rounded-xl">
                <div className="flex justify-between gap-4 py-2">
                  <div>
                    <FiAlertTriangle color="#E99824" size={25} />
                  </div>
                  <div>
                    <p className="text-[#F1D5AC] text-sm font-light">
                      You currently don&apos;t have any collateral posted for borrowing. Please deposit some assets and
                      enable it as collateral.
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-4">
                {!account ? (
                  <ConnectButton />
                ) : (
                  <button
                    disabled={disabled}
                    className="bg-[#3730AD] text-white text-lg rounded-full w-full disabled:bg-[#2E3031] disabled:text-[#6D6F6F] px-4 py-4"
                    onClick={handleBorrow}
                  >
                    Borrow
                  </button>
                )}
              </div>
            </div>
          </>
        ) : null}

        {selectedTab == "repay" ? (
          <>
            <div className="px-6 py-4">
              {/* <div className="flex justify-end gap-3">
                <a className="text-white text-md">25%</a>
                <a className="text-white text-md">50%</a>
                <a className="text-white text-md">75%</a>
                <a className="text-white text-md">MAX</a>
              </div> */}
              <div className="py-2">
                <div className="flex gap-4 items-center">
                  <input
                    type="number"
                    placeholder="0.00"
                    onChange={(e) => setInputValue(Number(e.target.value))}
                    className="bg-transparent text-4xl text-white focus:outline-none w-full"
                  />
                  <p className="text-white text-3xl">{cToken.underlyingToken.symbol}</p>
                </div>
                <div className="py-2">
                  <p className="text-white text-md"> =${inputTokenPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="py-2">
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Wallet Balance</p>
                  <p className="text-white text-md">
                    {foundUserTokenData?.underlyingBalance} {cToken.underlyingToken.symbol}
                  </p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Total Borrow Balance</p>
                  <p className="text-white text-md">${totalBorrowBalance}</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Borrow Utilization</p>
                  <p className="text-white text-md">{borrowPercentage.toFixed(2)}%</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Borrow APY</p>
                  <p className="text-white text-md">{cToken.borrowApy}%</p>
                </div>
              </div>
              <div className="py-4">
                {!account ? (
                  <ConnectButton />
                ) : (
                  <button
                    disabled={disabled}
                    className="bg-[#3730AD] text-white text-lg rounded-full w-full disabled:bg-[#2E3031] disabled:text-[#6D6F6F] px-4 py-4"
                    onClick={isApproved ? handleRepay : handleApprove}
                  >
                    {isApproved ? "Repay" : "Approve"}
                  </button>
                )}
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ActionButton;
