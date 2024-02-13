"use client";

import Image from "next/image";
import SettingsIcon from "/public/images/banner/settings-icon.svg";
import WalletIcon from "/public/images/banner/wallet-icon.svg";
import DiscordIcon from "/public/images/banner/discord-icon.svg";
import XIcon from "/public/images/banner/x-icon.svg";
import { formatAddress } from "@/lib/utils";
import { useAccount } from "wagmi";

interface BannerProps {
  username: string;
  bxpAmount: number;
  userImage: string;
  userBackgroundImage: string;
}

const Banner: React.FC<BannerProps> = ({ username, bxpAmount, userImage, userBackgroundImage }) => {
  const { address: account } = useAccount();

  return (
    // 138 207  276  345
    <section id="banner" className="h-[385px] xs:h-[290px] sm:h-[310px] md:h-[325px] lg:h-[345px] w-full relative">
      <div className="h-60 border w-full border-[#646009] rounded-3xl bg-[#ffffff0a] mix-blend-plus-lighter p-2 ">
        <div
          className="flex w-full h-full rounded-2xl  bg-cover bg-center justify-end px-7 py-[18px] relative "
          style={{
            backgroundImage: `url(${userBackgroundImage})`,
          }}
        >
          <div className="w-full h-full absolute top-0 right-0 rounded-2xl bg-black bg-opacity-75 " />
          <button className="flex w-8 h-8 p-1 justify-center items-center rounded bg-[#646009] z-50 hover:bg-opacity-90 active:scale-95">
            <Image src={SettingsIcon} alt="Settings Icon" className=" prevent-select" draggable="false" />
          </button>
        </div>

        {/* Absolute content for the banner */}

        <div className="absolute bottom-0 flex flex-wrap gap-10 w-full justify-between px-2 sm:px-10 lg:px-10 z-50">
          <div className="flex items-center gap-3">
            {/* UserImage part */}
            <div className="flex p-2 lg:p-[10px] flex-col items-center rounded-3xl border bg-bw-neutral-900 border-[#fff20054] shadow-sm shadow-[#00000040] ">
              <div className="flex h-[84px] w-[92px] sm:h-[126px] sm:w-[138px] md:h-[168px] md:w-[184px] lg:h-[210px] lg:w-[230px] p-[1px] bg-gradient-to-r from-bw-yellow-400 via-bw-yellow-100 to-bw-yellow-400 rounded-[14px]">
                <div
                  className="flex w-full h-full rounded-[14px] bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${userImage})`,
                  }}
                ></div>
              </div>
            </div>
            {/* End of userImage part */}

            {/* Username and BXP part */}
            <div className="flex flex-col gap-1 md:gap-3 -mt-5 xs:-mt-8 md:-mt-10">
              <div className="flex flex-col">
                <span className="font-medium text-lg md:text-xl lg:text-[32px] text-white leading-normal tracking-[1.28px]">
                  {username}
                </span>
                <span className="font-medium text-xs md:text-sm leading-4 text-[#ffffff80] -mt-2 lg:-mt-0.5">
                  {account && formatAddress(account, 8, 8)}
                </span>
              </div>
              <div className="flex w-fit px-2 py-1 lg:px-6 lg:py-3 justify-center items-center border border-bw-lime-900 rounded-lg bg-bw-yellow-900 bg-opacity-40 backdrop-blur-xl ">
                <span className="text-white text-sm md:text-base font-medium ">{bxpAmount} BLP</span>
              </div>
            </div>
          </div>
          {/* End of username and BXP part */}

          {/* Social media part */}
          <div className="flex gap-3 p-[10px] xs:mt-8 w-fit rounded-2xl border self-center border-bw-yellow-400 border-opacity-10 bg-[#1a1805]">
            <a
              href="https://twitter.com/Blastwayio"
              target="_blank"
              className="flex w-10 h-10 justify-center items-center bg-[#FFF200] rounded-md"
            >
              <Image src={XIcon} alt="XIcon" className="w-5 h-5 prevent-select" draggable="false" />
            </a>

            <a
              href="https://t.co/8MgRzVV0eU"
              target="_blank"
              className="flex w-10 h-10 justify-center items-center bg-[#FFF200] rounded-md"
            >
              <Image src={DiscordIcon} alt="XIcon" className="w-5 h-5 prevent-select" draggable="false" />
            </a>

            <div className="flex w-10 h-10 justify-center items-center bg-[#FFF200] rounded-md">
              <Image src={WalletIcon} alt="XIcon" className="w-5 h-5 prevent-select" draggable="false" />
            </div>
          </div>
          {/* End of social media part */}
        </div>
        {/* End of absolute content for the banner */}
      </div>
    </section>
  );
};

export default Banner;
