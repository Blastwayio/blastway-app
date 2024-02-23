'use client';
import { Button } from './ui/button';

export default function FaucetGasButton() {
  const gasFaucet = async () => {
    window.open('https://discord.gg/vnMvuTHt', '_blank');
  };
  return (
    <Button className="mx-auto mb-4 w-[80%] text-black" onClick={gasFaucet}>
      {'Gas Faucet'}
    </Button>
  );
}
