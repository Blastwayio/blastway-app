import QuestDiscordImage from "/public/images/quest/quest-discord-image.webp";
import QuestTwitterImage from "/public/images/quest/quest-twitter-image.webp";



const quests = [
  {
    questName: "Follow our Twitter",
    questDescription: "Follow our Twitter",
    questReward: "10",
    questProgress: "1",
    contractAddress: "0x0490211c0cF6Ddd5154F18c9bC14b0c313831b88",
    chainId: 168587773,
    questLink: "https://twitter.com/intent/follow?screen_name=Blastwayio",
    questImage: QuestTwitterImage
  },
  {
    questName: "Twitter Like & RT",
    questDescription: "Twitter Like & RT",
    questReward: "10",
    questProgress: "1",
    contractAddress: "0x522a5805216919D93a998853265F91098d833F20",
    chainId: 168587773,
    questLink: "https://twitter.com/intent/like?tweet_id=1756782590629925041",
    questImage: QuestTwitterImage

  },
  {
    questName: "Join our Discord",
    questDescription: "Join our Discord",
    questReward: "10",
    questProgress: "1",
    contractAddress: "0x0490211c0cF6Ddd5154F18c9bC14b0c313831b88",
    chainId: 168587773,
    questLink: "https://discord.gg/blastway",
    questImage: QuestDiscordImage

  },
];
export default quests;
