'use client';
import { erc721Abi } from 'viem';
import { useAccount, useReadContracts } from 'wagmi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import quests from '@/config/constants/quests';
import QuestCard from './QuestCard';

const Quests = () => {
  const { address: account } = useAccount();
  const contracts = quests.map((quest) => {
    return {
      abi: erc721Abi,
      address: quest.contractAddress as `0x${string}`,
      functionName: 'balanceOf',
      args: [account],
      chainId: quest.chainId,
    };
  });
  const result = useReadContracts({
    contracts,
  });
  const questsWithCompletedData = quests.map((quest, index) => {
    return {
      ...quest,
      isCompleted: !!account && result.data?.[index].result?.toString() !== '0',
    };
  });
  return (
    <section className="flex w-full items-center gap-8 text-white">
      <Tabs defaultValue="quests" className="w-full">
        <TabsList className="mb-5 w-full gap-4">
          <TabsTrigger value="quests" className="w-full">
            Quests
          </TabsTrigger>
          <TabsTrigger value="completedquests" className="w-full">
            Completed Quests
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="quests"
          className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {questsWithCompletedData.map((quest, index) => {
            return (
              <a key={`${quest.questName}#${index}`} href={quest.questLink} target="_blank">
                <QuestCard key={index} {...quest} />
              </a>
            );
          })}
        </TabsContent>
        {questsWithCompletedData.filter((quest) => quest.isCompleted).length > 0 ? (
          <TabsContent
            value="completedquests"
            className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {questsWithCompletedData
              .filter((quest) => quest.isCompleted)
              .map((quest, index) => {
                return <QuestCard key={index} {...quest} />;
              })}
          </TabsContent>
        ) : (
          <div className="mt-5 w-full text-center font-bold text-white">
            Note: Points and completed quests will be calculated later.
          </div>
        )}
      </Tabs>
    </section>
  );
};
export default Quests;
