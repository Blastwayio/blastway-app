'use client';

import Image from 'next/image';
import SettingsIcon from '/public/images/banner/settings-icon.svg';
import WalletIcon from '/public/images/banner/wallet-icon.svg';
import DiscordIcon from '/public/images/banner/discord-icon.svg';
import XIcon from '/public/images/banner/x-icon.svg';
import { formatAddress } from '@/lib/utils';
import { useAccount } from 'wagmi';

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
    <section id="banner" className="xs:h-[290px] relative h-[385px] w-full sm:h-[310px] md:h-[325px] lg:h-[345px]">
      <div className="h-60 w-full rounded-3xl border border-[#646009] bg-[#ffffff0a] p-2 mix-blend-plus-lighter ">
        <div
          className="relative flex h-full w-full  justify-end rounded-2xl bg-cover bg-center px-7 py-[18px] "
          style={{
            backgroundImage: `url(${userBackgroundImage})`,
          }}
        >
          <div className="absolute right-0 top-0 h-full w-full rounded-2xl bg-black bg-opacity-75 " />
          <button className="z-50 flex h-8 w-8 items-center justify-center rounded bg-[#646009] p-1 hover:bg-opacity-90 active:scale-95">
            <Image src={SettingsIcon} alt="Settings Icon" className=" select-none" draggable="false" />
          </button>
        </div>

        {/* Absolute content for the banner */}

        <div className="absolute bottom-0 z-50 flex w-full flex-wrap justify-between gap-10 px-2 sm:px-10 lg:px-10">
          <div className="flex items-center gap-3">
            {/* UserImage part */}
            <div className="flex flex-col items-center rounded-3xl border border-[#fff20054] bg-bw-neutral-900 p-2 shadow-sm shadow-[#00000040] lg:p-[10px] ">
              <div className="flex h-[84px] w-[92px] rounded-[14px] bg-gradient-to-r from-bw-yellow-400 via-bw-yellow-100 to-bw-yellow-400 p-[1px] sm:h-[126px] sm:w-[138px] md:h-[168px] md:w-[184px] lg:h-[210px] lg:w-[230px]">
                <div
                  className="flex h-full w-full rounded-[14px] bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${userImage})`,
                  }}
                ></div>
              </div>
            </div>
            {/* End of userImage part */}

            {/* Username and BXP part */}
            <div className="xs:-mt-8 -mt-5 flex flex-col gap-1 md:-mt-10 md:gap-3">
              <div className="flex flex-col">
                <span className="text-lg font-medium leading-normal tracking-[1.28px] text-white md:text-xl lg:text-[32px]">
                  {username}
                </span>
                <span className="-mt-2 text-xs font-medium leading-4 text-[#ffffff80] md:text-sm lg:-mt-0.5">
                  {account && formatAddress(account, 8, 8)}
                </span>
              </div>
              <div className="flex w-fit items-center justify-center rounded-lg border border-bw-lime-900 bg-bw-yellow-900 bg-opacity-40 px-2 py-1 backdrop-blur-xl lg:px-6 lg:py-3 ">
                <span className="text-sm font-medium text-white md:text-base ">{bxpAmount} BLP</span>
              </div>
            </div>
          </div>
          {/* End of username and BXP part */}

          {/* Social media part */}
          <div className="xs:mt-8 flex w-fit gap-3 self-center rounded-2xl border border-bw-yellow-400 border-opacity-10 bg-[#1a1805] p-[10px]">
            <a
              href="https://twitter.com/Blastwayio"
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-md bg-[#FFF200]"
            >
              <Image src={XIcon} alt="XIcon" className="h-5 w-5 select-none" draggable="false" />
            </a>

            <a
              href="https://t.co/8MgRzVV0eU"
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-md bg-[#FFF200]"
            >
              <Image src={DiscordIcon} alt="XIcon" className="h-5 w-5 select-none" draggable="false" />
            </a>

            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#FFF200]">
              <Image src={WalletIcon} alt="XIcon" className="h-5 w-5 select-none" draggable="false" />
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
