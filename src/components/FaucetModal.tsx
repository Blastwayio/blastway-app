"use client";

import { useAccount } from "wagmi";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import ConnectButton from "./ConnectButton";
import CloseModalButton from "./CloseModalButton";

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
    <div className="flex flex-col text-center items-center justify-center">
      <h3 className="text-2xl font-bold text-white">
        {account ? "Congratulations!" : "Have you claimed your rewards yet?"}
      </h3>
      <div className="mt-2 px-7 py-3">
        <p className="text-lg text-gray-500">
          {account
            ? `You have successfully claimed your faucet rewards. ${
                canClaim ? "You can claim again in 24 hours." : ""
              }`
            : "Connect your wallet now to start claiming rewards instantly."}
        </p>
      </div>
      <div className="flex justify-center mt-4 gap-4">
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
    <main className="px-4 py-8 sm:px-10 sm:ml-60 sm:align-center ">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="p-8 border border-gray-800 w-96 shadow-lg rounded-md self-center bg-[#0e0e0e]">
          <FaucetModalContent />
        </div>
      </div>
    </main>
  );
  // );
}
