import Image from "next/image";
import TelegramIcon from "../../../public/images/footer/telegram-icon.svg";
import DiscordIcon from "../../../public/images/footer/discord-icon.svg";
import MailIcon from "../../../public/images/footer/mail-icon.svg";
import XIcon from "../../../public/images/footer/x-icon.svg";
import Pyth from "../../../public/images/footer/pyth-powered.svg";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="flex flex-col-reverse items-center lg:items-end justify-between text-[#C2C2C2] px-4 pb-4 pt-12 sm:px-10 lg:flex-row lg:py-6 mt-10 sm:ml-60 select-none"
    >
      <div className="flex flex-1  text-center  text-sm leading-[17.6px] font-normal">
        <span>
          <a href="#" className="hover:text-white">
            Blastway
          </a>
          &nbsp;© 2024 all rights reserved
        </span>
      </div>
      <div className="flex flex-col gap-10 items-center py-10 lg:py-0">
        <a href="https://pyth.network" target="_blank">
          <Image src={Pyth} alt="Pyth Powered" className="w-28 mr-5 " draggable="false" />
        </a>
        <div className="flex">
          <p className="px-4 text-sm sm:px-8  hover:text-white">
            <a href="https://docs.blastway.io/about-us/privacy-policy" target="_blank">
              Privacy Policy
            </a>
          </p>
          <p className="px-4 text-sm sm:px-8  hover:text-white">
            <a href="https://docs.blastway.io/about-us/terms-of-service" target="_blank">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
      <div className="flex flex-1 justify-end items-center gap-6 ">
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
