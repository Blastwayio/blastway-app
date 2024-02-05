import LendingCard from "@/Components/LendingCard";
import LendingBanner from "@/Components/LendingBanner";
import Sidebar from "@/Components/Sidebar";
import LendingStats from "@/Components/LendingStats";
import LendingList from "@/Components/LendingList";

const bannerStats = [
  {
    statOne: '43',
    statTwo: '45',
  }
];

const stats = [
  {
    marketSize: '12M',
    marketSizePercent: '45',
    dLPLocked: '56M',
    dLPLockedPercentage: '50',
    feesPaid: '1.1M',
    assetAmount: '3'
  }
];

const assets = [
  {
    name: 'ETH',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    deposited: '$0M',
    borrowed: '$0M',
    depositRate: '0%',
    borrowRate: '0%',
    maxLoop: '0%'
  },
  {
    name: 'USDC',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
    deposited: '$0M',
    borrowed: '$0M',
    depositRate: '0%',
    borrowRate: '0%',
    maxLoop: '0%'
  },
  {
    name: 'BLUR',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/23121.png',
    deposited: '$0M',
    borrowed: '$0M',
    depositRate: '0%',
    borrowRate: '0%',
    maxLoop: '0%'
  },
];


export default function Home() {
  return (
    <>
      <Sidebar />
      <div className="px-4 py-8 sm:px-10 sm:ml-60 sm:align-center">
          <LendingBanner bannerStats={bannerStats} />
          <LendingStats stats={stats} />
          <LendingList assets={assets} />
      </div>
    </>
  );
}