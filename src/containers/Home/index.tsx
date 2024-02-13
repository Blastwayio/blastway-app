import type { CToken } from "@/types";
import LendingBanner from "@/containers/Home/components/LendingBanner";
import LendingStats from "@/containers/Home/components/LendingStats";
import LendingList from "@/containers/Home/components/LendingList";
import CountDown from "./components/CountDown";

interface Props {
  bannerStats: any;
  stats: any;
  assets: CToken[];
}

const HomeContainer = ({ bannerStats, stats, assets }: Props) => {
  return (
    <main className="px-4 py-8 sm:px-10 sm:ml-60 sm:align-center">
      <LendingBanner bannerStats={bannerStats} assets={assets} />
      {/* <LendingStats stats={stats} /> */}
      <CountDown />
      <LendingList assets={assets} />
    </main>
  );
};

export default HomeContainer;
