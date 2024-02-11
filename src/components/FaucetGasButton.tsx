"use client";
import { Button } from "./ui/button";

export default function FaucetGasButton() {
  const gasFaucet = async () => {
    window.open("https://discord.gg/7SzNJn7X", "_blank");
  };
  return (
    <Button className="w-[80%] mb-4 mx-auto text-black" onClick={gasFaucet}>
      {"Gas Faucet"}
    </Button>
  );
}
