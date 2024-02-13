import Image from "next/image";
import CardBackground from "/public/images/card-background.png";

interface QuestProps {
  questName: string;
  questDescription: string;
  questReward: string;
  questProgress: string;
  isCompleted: boolean;
}

const QuestCard: React.FC<QuestProps> = ({ questName, questDescription, questReward, questProgress, isCompleted }) => {
  return (
    <div className="flex flex-col h-[350px] max-w-[348px] rounded-md bg-[#64600926] p-[10px] justify-between relative">
      <div className="flex flex-col gap-4">
        <Image
          src={CardBackground}
          alt="Quest Card"
          className="w-[328px] h-[170px] rounded bg-cover bg-center prevent-select"
          draggable="false"
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-white text-2xl capitalize font-medium">{questName}</h1>
          <p className="text-white text-opacity-75 text-base font-normal leading-none">{questDescription}</p>
        </div>
      </div>
      <div className="w-[141px] h-[31px] relative">
        <div className="w-fit h-[31px] px-4 py-2 left-0 top-0 absolute bg-[#646009] bg-opacity-20 rounded-md border border-[#282703] justify-center items-center inline-flex">
          <div className="text-white text-xs font-normal ">{questReward} BLP</div>
        </div>
        <div className="left-[94px] top-[8px] absolute text-white text-xs font-normal">{questProgress} tasks</div>
      </div>
      {isCompleted && (
        <div className="bg-[#FFF200] rounded absolute items-center justify-center px-2 py-0.5 right-5 top-5">
          <p className="text-black text-[10px] font-normal capitalize">Completed</p>
        </div>
      )}
    </div>
  );
};

export default QuestCard;
