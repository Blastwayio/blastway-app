import { Button } from "./ui/button";

export default function CloseModalButton() {
  return (
    <Button
      className="w-[80%] mb-4 mx-auto px-10 text-white"
      variant={"destructive"}
      onClick={() => open()}
    >
      Close
    </Button>
  );
}
