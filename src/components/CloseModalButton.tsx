import { Button } from './ui/button';

export default function CloseModalButton() {
  return (
    <Button className="mx-auto mb-4 w-[80%] px-10 text-white" variant={'destructive'} onClick={() => open()}>
      Close
    </Button>
  );
}
