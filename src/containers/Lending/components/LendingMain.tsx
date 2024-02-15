"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useEnterMarkets from "@/hooks/useEnterMarkets";
import useExitMarket from "@/hooks/useExitMarket";
import useSupply from "@/hooks/useSupply";
import useWithdraw from "@/hooks/useWithdraw";
import useBorrow from "@/hooks/useBorrow";
import useRepay from "@/hooks/useRepay";
import useApprove from "@/hooks/useApprove";
import { CToken } from "@/types";
import { useAccount } from "wagmi";
import ConnectButton from "@/components/ConnectButton";
import SupplyTab from "./tabs/SupplyTab";
import WithdrawTab from "./tabs/WithdrawTab";
import BorrowTab from "./tabs/BorrowTab";
import RepayTab from "./tabs/RepayTab";

interface LendingMainProps {
  asset: CToken;
  userData: ReturnType<typeof useUserData>;
}

const LendingMain: React.FC<LendingMainProps> = ({ asset, userData }) => {
  const { tokenData: userTokenData, borrowLimit: userBorrowLimit, totalBorrowBalance, borrowPercentage } = userData;

  const router = useRouter();
  const { address: account } = useAccount();

  const { onEnterMarkets } = useEnterMarkets([asset.address]);
  const { onExitMarket } = useExitMarket(asset.address);
  const { onSupply } = useSupply(asset.address);
  const { onWithdraw } = useWithdraw(asset.address);
  const { onBorrow } = useBorrow(asset.address);
  const { onRepay } = useRepay(asset.address);
  const { onApprove, allowanceData } = useApprove(asset.underlyingToken.address, asset.address);

  const [tab, setTab] = useState("Supply");
  const [userDataAsset, setUserDataAsset] = useState(userTokenData![0]);
  const [inputValue, setInputValue] = useState(0);
  const [collateralChecked, setCollateralChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const totalBalanceFormatted = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(parseInt(userDataAsset.underlyingBalance));

  const totalBalancePriceFormatted = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(parseInt(userDataAsset.underlyingBalance) * +asset.underlyingToken.price);

  const inputTokenPrice = inputValue * +asset.underlyingToken.price;

  const isApproved = BigInt(allowanceData || "0") >= BigInt(inputValue * 10 ** asset.underlyingToken.decimals);

  useEffect(() => {
    const userDataAsset = userTokenData!.find(
      (userDataAsset) => userDataAsset.symbol.toLowerCase() === asset.symbol.toLowerCase()
    );

    if (!userDataAsset) {
      toast.error(`User data for asset ${asset.symbol} not found. Redirecting back to home page.`);
      return router.push("/");
    }

    setUserDataAsset(userDataAsset);
  }, [asset.symbol, router, userTokenData]);

  useEffect(() => {
    if (userDataAsset.isInMarket) {
      setCollateralChecked(true);
    } else {
      setCollateralChecked(false);
    }
  }, [userDataAsset.isInMarket]);

  // disabling button if input is 0
  useEffect(() => {
    if (isApproved && inputValue === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [isApproved, inputValue]);

  useEffect(() => {
    setInputValue(0);
  }, [tab]);

  const enterMarket = async () => {
    try {
      await onEnterMarkets();
      setCollateralChecked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const exitMarket = async () => {
    try {
      await onExitMarket();
      setCollateralChecked(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async () => {
    try {
      setDisabled(true);
      await onApprove();
      toast.success("Approval successful");
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
        `supplying ${BigInt(inputValue * 10 ** asset.underlyingToken.decimals)} ${asset.underlyingToken.symbol}`
      );
      await onSupply(BigInt(inputValue * 10 ** asset.underlyingToken.decimals));
      toast.success("Supply successful");
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
        `withdrawing ${BigInt(inputValue * 10 ** asset.underlyingToken.decimals)} ${asset.underlyingToken.symbol}`
      );
      await onWithdraw(BigInt(inputValue * 10 ** asset.underlyingToken.decimals));
      toast.success("Withdraw successful");
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
        `borrowing ${BigInt(inputValue * 10 ** asset.underlyingToken.decimals)} ${asset.underlyingToken.symbol}`
      );
      await onBorrow(BigInt(inputValue * 10 ** asset.underlyingToken.decimals));
      toast.success("Borrow successful");
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
        `repaying ${BigInt(inputValue * 10 ** asset.underlyingToken.decimals)} ${asset.underlyingToken.symbol}`
      );
      await onRepay(BigInt(inputValue * 10 ** asset.underlyingToken.decimals));
      toast.success("Repay successful");
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  };

  const handleInputChange = (value: number) => {
    setInputValue(value);
  };

  const handleButtonClick = async () => {
    if (!isApproved) {
      return await handleApprove();
    }
    if (tab === "Supply") {
      if (inputValue > +userDataAsset.underlyingBalance) {
        return toast.error("You can't supply more than you have");
      }
      return await handleSupply();
    } else if (tab === "Withdraw") {
      if (inputValue > +userDataAsset.supplyBalance) {
        return toast.error("You can't withdraw more than you supplied");
      }
      return await handleWithdraw();
    } else if (tab === "Borrow") {
      if (inputTokenPrice > userBorrowLimit!) {
        return toast.error(
          `Borrow limit exceeded. Add more collateral (${
            +asset.collateralFactor * 100
          }% factor) to increase limit. Ensure assets are marked as collateral.`
        );
      }
      return await handleBorrow();
    } else if (tab === "Repay") {
      if (inputValue > +userDataAsset.borrowBalance) {
        return toast.error("You can't repay more than you borrowed");
      }
      await handleRepay();
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:flex-col-2 w-full space-y-4">
        <div className="bg-[#0E0E0E] w-full sm:w-8/12 px-2 sm:px-6 py-4 rounded-xl mx-auto border border-[#171717] flex flex-col">
          <div className="w-full flex justify-between bg-[#161616] py-1.5 px-1 sm:px-1.5 rounded-lg">
            <button
              className={`w-1/4 ${
                tab === "Supply" ? "bg-[#323232]" : "text-[#8A8A8A]"
              } py-2 rounded text-white text-xs sm:text-sm`}
              onClick={() => setTab("Supply")}
            >
              Supply
            </button>
            <button
              className={`w-1/4 ${
                tab === "Withdraw" ? "bg-[#323232]" : "text-[#8A8A8A]"
              } py-2 rounded text-white text-xs sm:text-sm`}
              onClick={() => setTab("Withdraw")}
            >
              Withdraw
            </button>
            <button
              className={`w-1/4 ${
                tab === "Borrow" ? "bg-[#323232]" : "text-[#8A8A8A]"
              } py-2 rounded text-white text-xs sm:text-sm`}
              onClick={() => setTab("Borrow")}
            >
              Borrow
            </button>
            <button
              className={`w-1/4 ${
                tab === "Repay" ? "bg-[#323232]" : "text-[#8A8A8A]"
              } py-2 rounded text-white text-xs sm:text-sm`}
              onClick={() => setTab("Repay")}
            >
              Repay
            </button>
          </div>

          <div className="w-full mt-8">
            <div className="flex justify-between">
              <p className="text-[#C3C3C3] py-2 px-1 text-sm sm:text-md">{tab}</p>
              <div className="flex flex-col items-end py-2 px-1 text-[#C3C3C3] text-sm sm:text-md">
                <p>
                  Wallet Balance: {totalBalanceFormatted} {asset.underlyingToken.symbol}
                </p>
                <p>~{totalBalancePriceFormatted}</p>
              </div>
            </div>
          </div>

          {tab === "Supply" ? (
            <>
              <SupplyTab
                userDataAsset={userDataAsset}
                collateralChecked={collateralChecked}
                exitMarket={exitMarket}
                enterMarket={enterMarket}
                userBorrowLimit={userBorrowLimit}
                asset={asset}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                totalBalanceFormatted={totalBalanceFormatted}
              />

              {/*                 <div className="flex justify-between items-center py-2">
                  <p className="text-gray-400 text-md">Total Supply</p>
                  <p className="text-white text-md">$ 634.2K</p>
                </div> */}
            </>
          ) : tab === "Withdraw" ? (
            <>
              <WithdrawTab
                userDataAsset={userDataAsset}
                userBorrowLimit={userBorrowLimit}
                borrowPercentage={borrowPercentage}
                asset={asset}
                inputValue={inputValue}
                onInputChange={handleInputChange}
              />
            </>
          ) : tab === "Borrow" ? (
            <>
              <BorrowTab
                collateralChecked={collateralChecked}
                exitMarket={exitMarket}
                enterMarket={enterMarket}
                userBorrowLimit={userBorrowLimit}
                borrowPercentage={borrowPercentage}
                totalBorrowBalance={totalBorrowBalance}
                asset={asset}
                inputValue={inputValue}
                onInputChange={handleInputChange}
              />
            </>
          ) : tab === "Repay" ? (
            <>
              <RepayTab
                userDataAsset={userDataAsset}
                asset={asset}
                totalBorrowBalance={totalBorrowBalance}
                borrowPercentage={borrowPercentage}
                inputValue={inputValue}
                onInputChange={handleInputChange}
              />
            </>
          ) : null}
          {account ? (
            <Button disabled={disabled} onClick={handleButtonClick} className="w-full py-2 mt-8">
              {isApproved ? tab : "Approve"}
            </Button>
          ) : (
            <ConnectButton className="w-full" />
          )}
        </div>
      </div>
    </>
  );
};

export default LendingMain;
