"use client";

import type { CToken } from "@/types";
import LendingMain from "./components/LendingMain";
import LendingTopStats from "./components/LendingTopStats";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUserData } from "@/hooks/useUserData";

interface Props {
  assets: CToken[];
}

const LendingContainer = ({ assets }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const userData = useUserData(assets);

  const searchParamsAsset = searchParams.get("asset");

  const [asset, setAsset] = useState(assets[0]);

  useEffect(() => {
    if (!searchParamsAsset) return router.push(`${pathname}?asset=${assets[0].underlyingToken.symbol}`);

    const asset = assets.find(
      (asset) => asset.underlyingToken.symbol.toLowerCase() === searchParamsAsset.toLowerCase()
    );

    if (!asset)
      return router.push(
        `${pathname}?asset=${assets[0].underlyingToken.symbol}&fromNotFoundAsset=${searchParamsAsset}`
      );

    const fromNotFoundAsset = searchParams.get("fromNotFoundAsset");

    if (fromNotFoundAsset) {
      toast.info(`Asset ${fromNotFoundAsset} not found. Redirected to ${assets[0].underlyingToken.symbol}`);
      return router.replace(`${pathname}?asset=${assets[0].underlyingToken.symbol}`);
    }

    setAsset(asset);
  }, [searchParamsAsset, assets, pathname, router]);

  console.log("asset", asset);

  return (
    <main className="px-4 py-4 sm:px-10 sm:ml-60 sm:align-center space-y-4">
      <LendingTopStats asset={asset} />
      <LendingMain asset={asset} userData={userData} />
    </main>
  );
};

export default LendingContainer;
