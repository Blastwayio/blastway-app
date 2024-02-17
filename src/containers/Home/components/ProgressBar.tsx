import { Progress } from "@/components/ui/progress";

interface Props {
  value: number;
}

const ProgressBar = ({ value }: Props) => {
  return <Progress value={value} />;
};

export default ProgressBar;
