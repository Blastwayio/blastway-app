import type { CToken } from "@/types";
import LendingBanner from "@/containers/Home/components/LendingBanner";
import LendingList from "@/containers/Home/components/LendingList";
import CountDown from "./components/CountDown";

interface Props {
  stats: any;
  assets: CToken[];
}

const HomeContainer = ({ stats, assets }: Props) => {
  return (
    <main className="px-4 sm:px-10 sm:ml-60 sm:mt-8 sm:align-center">
      <LendingBanner assets={assets} />
      {/* <LendingStats stats={stats} /> */}
      <CountDown />
      <LendingList assets={assets} />
    </main>
  );
};

export default HomeContainer;
