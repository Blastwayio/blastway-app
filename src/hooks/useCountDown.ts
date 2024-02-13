import { useEffect, useState } from "react";

const useCountDown = (end: number, start = Math.trunc(Date.now() / 1000)) => {
  const [time, setTime] = useState(Math.max(0, Math.trunc(end - start)));
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (start < Date.now() && end < Date.now()) {
      setDisabled(true);
    }
  }, [start, end]);

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = Math.max(0, Math.trunc(end - Date.now() / 1000));
      setTime(remainingTime);

      if (remainingTime === 0) {
        setDisabled(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [end, start]);

  return { time, disabled };
};

export default useCountDown;
