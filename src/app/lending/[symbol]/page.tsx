import LendAssetContainer from "@/containers/Lending/symbol";
import getCTokens from "@/lib/getters/getCTokens";
import { redirect } from "next/navigation";

export default async function LendAsset({ params }: { params: { symbol: string } }) {
  const cTokens = await getCTokens();
  const asset = cTokens.find((asset) => asset.underlyingToken.symbol.toLowerCase() === params.symbol.toLowerCase());

  if (!asset) {
    redirect("/");
  }

  return <LendAssetContainer asset={asset} />;
}
