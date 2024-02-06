import type { CToken } from "@/types";
import LendingMain from "../components/LendingMain";
import LendingTopStats from "../components/LendingTopStats";
import { Suspense } from "react";

interface Props {
  asset: CToken;
}

const LendAssetContainer = ({ asset }: Props) => {
  return (
    <main className="px-4 py-4 sm:px-10 sm:ml-60 sm:align-center space-y-4">
      <LendingTopStats asset={asset} />
      <Suspense fallback={<h1>loading</h1>}>
        <LendingMain asset={asset} />
      </Suspense>
    </main>
  );
};

export default LendAssetContainer;
