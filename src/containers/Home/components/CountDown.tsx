'use client';
import useCountDown from '@/hooks/useCountDown';
import moment from 'moment';

const CountDown = () => {
  const { time } = useCountDown(1708023600);
  const timeDuration = moment.duration(time, 'seconds');
  return (
    <div className="my-4 mt-10 flex w-full select-none flex-col items-center justify-center gap-2 text-bwPrimary">
      <span className="text-2xl font-bold">{time > 0 ? 'New token released in' : 'New features incoming'}</span>

      {time > 0 && (
        <div className="flex gap-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="flex h-14 w-20 items-center justify-center rounded-sm bg-yellow-400 bg-opacity-20 text-2xl font-bold">
              <p>{timeDuration.days()}</p>
            </span>
            <p>{timeDuration.days() > 1 ? 'Days' : 'Day'}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="flex h-14 w-20 items-center justify-center rounded-sm bg-yellow-400 bg-opacity-20 text-2xl font-bold">
              <p>{timeDuration.hours()}</p>
            </span>
            <p>{timeDuration.hours() > 1 ? 'Hours' : 'Hour'}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="flex h-14 w-20 items-center justify-center rounded-sm bg-yellow-400 bg-opacity-20 text-2xl font-bold">
              <p>{timeDuration.minutes()}</p>
            </span>
            <p>{timeDuration.minutes() > 1 ? 'Minutes' : 'Minute'}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="flex h-14 w-20 items-center justify-center rounded-sm bg-yellow-400 bg-opacity-20 text-2xl font-bold">
              <p>{timeDuration.seconds()}</p>
            </span>
            <p>{timeDuration.seconds() > 1 ? 'Seconds' : 'Second'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountDown;
