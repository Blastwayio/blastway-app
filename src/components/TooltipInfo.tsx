import { AlertTriangle, HelpCircle, InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface Props {
  variant?: "info" | "warning" | "question";
  text: string;
}

const iconMap = {
  info: <InfoIcon className="w-4 h-4" />,
  warning: <AlertTriangle className="w-4 h-4" />,
  question: <HelpCircle className="w-4 h-4" />,
};

const TooltipInfo = ({ text, variant = "info" }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{iconMap[variant]}</TooltipTrigger>
      <TooltipContent className="bg-[#18181b] border-none text-white">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipInfo;
