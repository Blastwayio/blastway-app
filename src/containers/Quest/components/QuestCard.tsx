import Image, { StaticImageData } from 'next/image';
import CardBackground from '/public/images/card-background.png';

interface QuestProps {
  questName: string;
  questDescription: string;
  questImage: StaticImageData;
  questReward: string;
  questProgress: string;
  isCompleted: boolean;
}

const QuestCard: React.FC<QuestProps> = ({
  questName,
  questDescription,
  questReward,
  questProgress,
  isCompleted,
  questImage,
}) => {
  return (
    <div className="relative flex h-[350px] max-w-[348px] flex-col justify-between rounded-md bg-[#64600926] p-[10px]">
      <div className="flex flex-col gap-4">
        <Image
          src={questImage}
          alt="Quest Card"
          className="h-[170px] w-[328px] select-none rounded"
          draggable="false"
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-medium capitalize text-white">{questName}</h1>
          <p className="text-base font-normal leading-none text-white text-opacity-75">{questDescription}</p>
        </div>
      </div>
      <div className="relative h-[31px] w-[141px]">
        <div className="absolute left-0 top-0 inline-flex h-[31px] w-fit items-center justify-center rounded-md border border-[#282703] bg-[#646009] bg-opacity-20 px-4 py-2">
          <div className="text-xs font-normal text-white ">{questReward} BLP</div>
        </div>
        <div className="absolute left-[94px] top-[8px] text-xs font-normal text-white">{questProgress} tasks</div>
      </div>
      {isCompleted && (
        <div className="absolute right-5 top-5 items-center justify-center rounded bg-[#FFF200] px-2 py-0.5">
          <p className="text-[10px] font-normal capitalize text-black">Completed</p>
        </div>
      )}
    </div>
  );
};

export default QuestCard;
