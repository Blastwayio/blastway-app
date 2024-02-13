import Banner from "./components/Banner";
import Info from "./components/Info";
import Quests from "./components/Quests";

const dummyUserData = {
  username: "Blast.eth",
  bxpAmount: 0,
  userImage: "/images/pacman.jpg",
  userBackgroundImage: "/images/pacman_banner.jpeg",
};

const QuestContainer = () => {
  return (
    <main className="flex flex-col gap-8 px-4 py-8 sm:px-10 sm:ml-60 sm:align-center">
      <Banner {...dummyUserData} />
      <Info />
      <Quests />
    </main>
  );
};

export default QuestContainer;
