"use client";

import { Button } from "./ui/button";
import { useState } from "react"; // Import useState
import useRequestTokens from "@/hooks/useRequestTokens";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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
          className="w-[80%] mb-4 mx-auto text-black"
          onClick={onButtonClick}
          disabled={!allowedToWithdraw || disabled}
        >
          {"Token Faucet"}
        </Button>
      </TooltipTrigger>
      {!allowedToWithdraw && (
        <TooltipContent className="bg-[#18181b] border-none text-white">
          <p>You can claim again in 24 hours</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
