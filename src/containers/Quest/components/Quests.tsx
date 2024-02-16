"use client";
import { erc721Abi } from "viem";
import { useAccount, useReadContracts } from "wagmi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import quests from "@/config/constants/quests";
import QuestCard from "./QuestCard";

const Quests = () => {
  const { address: account } = useAccount();
  const contracts = quests.map((quest) => {
    return {
      abi: erc721Abi,
      address: quest.contractAddress as `0x${string}`,
      functionName: "balanceOf",
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
      isCompleted: !!account && result.data?.[index].result?.toString() !== "0",
    };
  });
  return (
    <section className="text-white w-full flex items-center gap-8">
      <Tabs defaultValue="quests" className="w-full">
        <TabsList className="w-full gap-4 mb-5">
          <TabsTrigger value="quests" className="w-full">
            Quests
          </TabsTrigger>
          <TabsTrigger value="completedquests" className="w-full">
            Completed Quests
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="quests"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-4"
        >
          {questsWithCompletedData.map((quest, index) => {
            return (
              <a href={quest.questLink} target="_blank">
                <QuestCard key={index} {...quest} />
              </a>
            );
          })}
        </TabsContent>
        {questsWithCompletedData.filter((quest) => quest.isCompleted).length > 0 ? (
          <TabsContent
            value="completedquests"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-4"
          >
            {questsWithCompletedData
              .filter((quest) => quest.isCompleted)
              .map((quest, index) => {
                return <QuestCard key={index} {...quest} />;
              })}
          </TabsContent>
        ) : (
          <div className="text-center text-white w-full font-bold mt-5">
            Note: Points and completed quests will be calculated later.
          </div>
        )}
      </Tabs>
    </section>
  );
};
export default Quests;
