import HomeContainer from "@/containers/Home";
import getCTokens from "@/lib/getters/getCTokens";

const bannerStats = [
  {
    statOne: "43",
    statTwo: "45",
  },
];

const stats = [
  {
    marketSize: "12M",
    marketSizePercent: "45",
    dLPLocked: "56M",
    dLPLockedPercentage: "50",
    feesPaid: "1.1M",
    assetAmount: "3",
  },
];

export default async function Home() {
  const cTokens = await getCTokens();

  return <HomeContainer assets={cTokens} bannerStats={bannerStats} stats={stats} />;
}
