'use client';
import Image from 'next/image';
import TelegramIcon from '../../../public/images/footer/telegram-icon.svg';
import DiscordIcon from '../../../public/images/footer/discord-icon.svg';
import MailIcon from '../../../public/images/footer/mail-icon.svg';
import XIcon from '../../../public/images/footer/x-icon.svg';
import Pyth from '../../../public/images/footer/pyth-powered.svg';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  const isPythShown = pathname === '/' || pathname === '/lending';

  return (
    <footer
      id="footer"
      className="mt-10 flex select-none flex-col-reverse items-center justify-between px-4 pb-4 pt-12 text-[#C2C2C2] sm:ml-60 sm:px-10 lg:flex-row lg:items-end lg:py-6"
    >
      <div className="flex flex-1  text-center  text-sm font-normal leading-[17.6px]">
        <span>
          <a href="#" className="hover:text-white">
            Blastway
          </a>
          &nbsp;© 2024 all rights reserved
        </span>
      </div>
      <div className="flex flex-col items-center gap-10 py-10 lg:py-0">
        {isPythShown && (
          <a href="https://pyth.network" target="_blank">
            <Image src={Pyth} alt="Pyth Powered" className="mr-5 w-28 " draggable="false" />
          </a>
        )}
        <div className="flex">
          <p className="px-4 text-sm hover:text-white  sm:px-8">
            <a href="https://docs.blastway.io/about-us/privacy-policy" target="_blank">
              Privacy Policy
            </a>
          </p>
          <p className="px-4 text-sm hover:text-white  sm:px-8">
            <a href="https://docs.blastway.io/about-us/terms-of-service" target="_blank">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end gap-6 ">
        <a href="https://twitter.com/Blastwayio" target="_blank">
          <Image draggable="false" src={XIcon} alt="X Icon" />
        </a>
        <a href="https://t.co/8MgRzVV0eU" target="_blank">
          <Image draggable="false" src={DiscordIcon} alt="Discord Icon" />
        </a>
        <a href="https://t.me/blastwayio" target="_blank">
          <Image draggable="false" src={TelegramIcon} alt="Telegram Icon" />
        </a>
        <a href="mailto:contact@blastway.io" target="_blank">
          <Image draggable="false" src={MailIcon} alt="Mail Icon" />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
