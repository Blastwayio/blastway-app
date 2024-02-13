"use client";
import useCountDown from "@/hooks/useCountDown";
import moment from "moment";

const CountDown = () => {
  const { time } = useCountDown(1707908400);
  const timeDuration = moment.duration(time, "seconds");
  return (
    <div className="flex flex-col w-full items-center justify-center text-bwPrimary gap-2 my-4 select-none">
      <span className="text-2xl font-bold">New token released in</span>

      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-2 justify-center">
          <span className="text-2xl font-bold h-14 w-20 bg-yellow-400 bg-opacity-20 rounded-sm items-center justify-center flex">
            <p>{timeDuration.days()}</p>
          </span>
          <p>{timeDuration.days() > 1 ? "Days" : "Day"}</p>
        </div>
        <div className="flex flex-col items-center gap-2 justify-center">
          <span className="text-2xl font-bold h-14 w-20 bg-yellow-400 bg-opacity-20 rounded-sm items-center justify-center flex">
            <p>{timeDuration.hours()}</p>
          </span>
          <p>{timeDuration.hours() > 1 ? "Hours" : "Hour"}</p>
        </div>
        <div className="flex flex-col items-center gap-2 justify-center">
          <span className="text-2xl font-bold h-14 w-20 bg-yellow-400 bg-opacity-20 rounded-sm items-center justify-center flex">
            <p>{timeDuration.minutes()}</p>
          </span>
          <p>{timeDuration.minutes() > 1 ? "Minutes" : "Minute"}</p>
        </div>
        <div className="flex flex-col items-center gap-2 justify-center">
          <span className="text-2xl font-bold h-14 w-20 bg-yellow-400 bg-opacity-20 rounded-sm items-center justify-center flex">
            <p>{timeDuration.seconds()}</p>
          </span>
          <p>{timeDuration.seconds() > 1 ? "Seconds" : "Second"}</p>
        </div>
      </div>

    </div>
  );
};

export default CountDown;
