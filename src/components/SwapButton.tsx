import { Button } from "./ui/button";

export default function SwapButton(...props: any[]) {
  // @todo:props should be fixed
  return (
    <Button className="mb-4 mx-auto text-[#575757] w-full bg-[#1F1F1F] hover:bg-[#1F1F1F]/80 " disabled {...props}>
      Enter a valid amount to swap
    </Button>
  );
}
