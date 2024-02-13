import Image from "next/image";
import Arrow from "/public/images/arrow.svg";
const InfoCard = ({ label, rank }: { label: string; rank?: string }) => {
  return (
    <a
      href="#"
      className="w-full flex text-sm sm:text-lg lg:text-2xl gap-5 h-20 lg:h-[90px]  items-center pl-[30px] pr-10 rounded-lg border border-bw-lime-950 bg-bw-yellow-900 bg-opacity-15 justify-between"
    >
      <span className="font-medium capitalize leading-normal  text-white ">
        {label} {rank && "#" + rank}
      </span>
      <Image src={Arrow} alt="Info Card" className="w-5 sm:w-6 lg:w-8" />
    </a>
  );
};

export default InfoCard;
