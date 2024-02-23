'use client';

import { Button } from './ui/button';
import { useState } from 'react'; // Import useState
import useRequestTokens from '@/hooks/useRequestTokens';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function FaucetButton() {
  const [disabled, setDisabled] = useState(false);

  const { onRequestTokens, allowedToWithdraw } = useRequestTokens();

  const onButtonClick = async () => {
    try {
      setDisabled(true);
      await onRequestTokens();
    } catch (e) {
      console.error(e);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="mx-auto mb-4 w-[80%] text-black"
          onClick={onButtonClick}
          disabled={!allowedToWithdraw || disabled}
        >
          {'Token Faucet'}
        </Button>
      </TooltipTrigger>
      {!allowedToWithdraw && (
        <TooltipContent className="border-none bg-[#18181b] text-white">
          <p>You can claim again in 24 hours</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
