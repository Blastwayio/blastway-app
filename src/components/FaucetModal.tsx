'use client';

import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import ConnectButton from './ConnectButton';
import CloseModalButton from './CloseModalButton';

function FaucetModalContent() {
  const { address: account } = useAccount();
  const [canClaim, setCanClaim] = useState(false);

  useEffect(() => {
    // Implement your logic to determine if the user can claim rewards (e.g., check timestamp, etc.)
    const userCanClaim = true; // Replace with your actual logic
    setCanClaim(userCanClaim);
  }, []);

  const closeModal = () => {
    // toggleModal();
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h3 className="text-2xl font-bold text-white">
        {account ? 'Congratulations!' : 'Have you claimed your rewards yet?'}
      </h3>
      <div className="mt-2 px-7 py-3">
        <p className="text-lg text-gray-500">
          {account
            ? `You have successfully claimed your faucet rewards. ${canClaim ? 'You can claim again in 24 hours.' : ''}`
            : 'Connect your wallet now to start claiming rewards instantly.'}
        </p>
      </div>
      <div className="mt-4 flex justify-center gap-4">
        {account ? (
          <CloseModalButton />
        ) : (
          <>
            <ConnectButton />
            <CloseModalButton />
          </>
        )}
      </div>
    </div>
  );
}

export default function FaucetModal() {
  //   const { isOpen } = useFaucetModal();

  return (
    // isOpen && (
    <main className="sm:align-center px-4 py-8 sm:ml-60 sm:px-10 ">
      <div className="fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50">
        <div className="w-96 self-center rounded-md border border-gray-800 bg-[#0e0e0e] p-8 shadow-lg">
          <FaucetModalContent />
        </div>
      </div>
    </main>
  );
  // );
}
