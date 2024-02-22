import { useState } from "react";
import { useAccount } from "wagmi";
import ConnectButton from "@/components/ConnectButton";
import useApprove from "@/hooks/useApprove";
import { CToken } from "@/types";
import { Button } from "@/components/ui/button";

interface Props {
  text: "Supply" | "Withdraw" | "Borrow" | "Repay";
  method: () => Promise<void>;
  asset: CToken;
  inputValue: number;
  setInputValue: (value: number) => void;
  disabled: boolean;
}

const TabButton = ({ text, method, asset, inputValue, disabled, setInputValue }: Props) => {
  const [loading, setLoading] = useState(false);

  const { address: account } = useAccount();

  const { onApprove, allowanceData } = useApprove(asset.underlyingToken.address, asset.address);

  const needCheckApprove = ["Supply", "Repay"].includes(text);
  const isApproved =
    BigInt(allowanceData || "0") >= BigInt(inputValue * 10 ** asset.underlyingToken.decimals) || !needCheckApprove;

  const handleApprove = async () => {
    try {
      setLoading(true);
      await onApprove();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMethod = async () => {
    try {
      setLoading(true);
      await method();
      setInputValue(0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!account) {
    return <ConnectButton className="w-full" />;
  }

  if (!isApproved) {
    return (
      <Button onClick={handleApprove} loading={loading} className="w-full py-2 mt-8">
        {loading ? "Approving..." : "Approve"}
      </Button>
    );
  }

  return (
    <Button
      disabled={disabled || (isApproved && inputValue === 0)}
      loading={loading}
      onClick={handleMethod}
      className="w-full py-2 mt-8 text-black"
    >
      {loading ? `${text}ing...` : text}
    </Button>
  );
};

export default TabButton;
