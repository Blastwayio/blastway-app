import { AlertTriangle, HelpCircle, InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface Props {
  variant?: 'info' | 'warning' | 'question';
  text: string;
}

const iconMap = {
  info: <InfoIcon className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
  question: <HelpCircle className="h-4 w-4" />,
};

const TooltipInfo = ({ text, variant = 'info' }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{iconMap[variant]}</TooltipTrigger>
      <TooltipContent className="border-none bg-[#18181b] text-white">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipInfo;
