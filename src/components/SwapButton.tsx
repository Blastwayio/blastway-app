import { Button } from "./ui/button";

export default function SwapButton(...props: any[]) {
  // @todo:props should be fixed
  return (
    <Button className="mb-4 mx-auto text-[#575757] w-full bg-[#1F1F1F] " {...props}>
      Enter a valid amount to swap
    </Button>
  );
}
