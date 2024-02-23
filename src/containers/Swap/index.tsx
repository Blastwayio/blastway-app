import ConstructionBanner from '@/components/Banner/Construction';
import SwapMain from './components/SwapMain';

const SwapContainer = () => {
  return (
    <>
      <ConstructionBanner />
      <main className="sm:align-center flex flex-col gap-8 px-4 text-white sm:ml-60 sm:mt-8 sm:items-center sm:justify-center sm:px-10">
        <SwapMain />
      </main>
    </>
  );
};

export default SwapContainer;
