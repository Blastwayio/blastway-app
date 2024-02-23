import { Button } from '@/components/ui/button';
import { CHAIN_ID } from '@/config';
import ADDRESSES from '@/config/constants/addresses';
import useSwap from '@/hooks/useSwap';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';

export default function SwapButton({ fromAmount, toAmount }: { fromAmount: number; toAmount: number }) {
  const [loading, setLoading] = useState(false);

  const { onSwap } = useSwap();

  const handleSwap = async () => {
    try {
      setLoading(true);
      await onSwap({
        fromToken: ADDRESSES.ThrusterUSDC[CHAIN_ID],
        toToken: ADDRESSES.ThrusterUSDT[CHAIN_ID],
        fromAmount,
        toAmount,
        slippage: 20,
        recipient: '',
        deadline: 0,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={handleSwap} loading={loading} disabled className="mx-auto mb-4 w-full">
          Swap
        </Button>
      </TooltipTrigger>
      <TooltipContent className="border-none bg-[#18181b] text-white">
        <p>The swap feature is currently disabled, coming soon!</p>
      </TooltipContent>
    </Tooltip>
  );
}
