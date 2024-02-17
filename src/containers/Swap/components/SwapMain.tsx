import Image from "next/image";
import SwapButton from "@/components/SwapButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import SwapArrows from "/public/images/swap/swap-arrows.svg";
import ETHTokenImage from "/public/images/tokens/eth.webp";

const SwapMain = () => {
  return (
    <div className="flex flex-col  w-full lg:w-4/5 xl:w-2/5 lg:self-center space-y-4">
      <div className="bg-[#0E0E0E] w-full px-2 sm:px-6 py-4 rounded-xl mx-auto border border-[#171717] flex flex-col gap-8 ">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <p className="text-[#C3C3C3] py-2 px-1 text-base">From</p>
            <div className="flex gap-2 items-end py-2 px-1 text-[#3E3E3E] text-sm">
              <p>Wallet Balance: </p>
              <p className="text-[#3E3E3E] text-sm">O ETH</p>
            </div>
          </div>
          <div className="flex items-center bg-[#0B0B0B] px-2 rounded-lg border border-[#171717]">
            <input
              type="number"
              placeholder="0.00"
              className="focus:outline-none py-3 bg-[#0B0B0B] text-white/80124 text-md text-white sm:text-xl w-full"
            />
            <div className="flex items-center space-x-2">
              <button className="flex items-center bg-[#171717] space-x-2 w-20 px-2 py-2 rounded-l-full">
                <div className="flex items-center gap-1">
                  <Image src={ETHTokenImage} alt={"A token image"} className="rounded-full h-4" />
                  <span className="text-[#8A8A8A] text-sm">WETH</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Image src={SwapArrows} alt="Swap Arrows" className="mx-auto" />
          <div className="flex justify-between items-center">
            <p className="text-[#C3C3C3] py-2 px-1 text-base">To</p>
          </div>
          <div className="flex items-center bg-[#0B0B0B] px-2 rounded-lg border border-[#171717]">
            <input
              type="number"
              placeholder="0.00"
              className="focus:outline-none py-3 bg-[#0B0B0B] text-white/80124 text-md text-white sm:text-xl w-full"
            />
            <div className="flex items-center space-x-2">
              <button className="flex items-center bg-[#171717] space-x-2 w-20 px-2 py-2 rounded-l-full">
                <div className="flex items-center gap-1">
                  <Image src={ETHTokenImage} alt={"A token image"} className="rounded-full h-4" />
                  <span className="text-[#8A8A8A] text-sm">WETH</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <SwapButton />
          </TooltipTrigger>
          <TooltipContent className="bg-[#18181b] border-none text-white">
            <p>The swap feature is currently disabled, coming soon!</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default SwapMain;
