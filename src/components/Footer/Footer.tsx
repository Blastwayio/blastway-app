import DiscordButton from "./DiscordButton";
import DiscordShape from "../../../public/images/footer/discord-shape.svg";
import XIcon from "../../../public/images/footer/x-icon.svg";
import DiscordIcon from "../../../public/images/footer/discord-icon.svg";
import TelegramIcon from "../../../public/images/footer/telegram-icon.svg";
import MailIcon from "../../../public/images/footer/mail-icon.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="flex flex-col px-4 py-8 sm:px-10 sm:ml-60 sm:align-center justify-end gap-[52px] h-fit "
    >
      <div className="flex flex-col-reverse gap-5 lg:flex-row justify-between items-center">
        <div className="flex xl:flex-1 gap-4 max-sm:items-center max-lg:flex-col">
          <p className="flex text-[#C2C2C2] text-center text-sm sm:text-base leading-[17.6px] font-normal">
            <a href="https://docs.blastway.io/about-us/privacy-policy" target="_blank">
              Privacy Policy
            </a>
          </p>
          <p className="flex text-[#C2C2C2] text-center text-sm sm:text-base leading-[17.6px] font-normal">
            <a href="https://docs.blastway.io/about-us/terms-of-service" target="_blank">
              Terms of Service
            </a>
          </p>
        </div>
        <p className="flex xl:flex-1 justify-center text-[#C2C2C2] text-center text-sm sm:text-base leading-[17.6px] font-normal">
          <a href="#">Blastway</a>
          &nbsp;© 2024 all rights reserved
        </p>
        <div className="flex xl:flex-1 items-center justify-end gap-4">
          <a href="https://twitter.com/Blastwayio" target="_blank">
            <Image className="prevent-select" draggable="false" src={XIcon} alt="X Icon" />
          </a>
          <a href="https://t.co/8MgRzVV0eU" target="_blank">
            <Image className="prevent-select" draggable="false" src={DiscordIcon} alt="Discord Icon" />
          </a>
          <a href="https://t.me/blastwayio" target="_blank">
            <Image className="prevent-select" draggable="false" src={TelegramIcon} alt="Telegram Icon" />
          </a>
          <a href="mailto:contact@blastway.io" target="_blank">
            <Image className="prevent-select" draggable="false" src={MailIcon} alt="Mail Icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
