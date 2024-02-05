import LendingMain from "@/Components/LendingMain";
import LendingTopStats from "@/Components/LendingTopStats";
import Sidebar from "@/Components/Sidebar";

const assets = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    deposited: '$0M',
    borrowed: '$0M',
    depositRate: '0%',
    borrowRate: '0%',
    maxLoop: '0%'
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
    deposited: '$0M',
    borrowed: '$0M',
    depositRate: '0%',
    borrowRate: '0%',
    maxLoop: '0%'
  },
  {
    name: 'BLUR',
    symbol: 'BLUR',
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
      <div className="px-4 py-4 sm:px-10 sm:ml-60 sm:align-center space-y-4">
        <LendingTopStats assets={assets} />
        <LendingMain assets={assets} />
      </div>
    </>
  );
}
