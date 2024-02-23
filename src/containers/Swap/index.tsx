import ConstructionBanner from "@/components/Banner/Construction";
import SwapMain from "./components/SwapMain";

const SwapContainer = () => {
  return (
    <>
      <ConstructionBanner />
      <main className="flex flex-col gap-8 px-4 sm:px-10 sm:ml-60 sm:mt-8 sm:align-center sm:items-center sm:justify-center text-white">
        <SwapMain />
      </main>
    </>
  );
};

export default SwapContainer;
