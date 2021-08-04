import { useCallback, useRef, useState } from "react";

const useAntiShake = <T = any, Params extends any[] = any[]>(
  method: (...arg: Params) => Promise<T>,
  options?: {
    /** 防抖时间,值为 setTimeout 的延时参数,默认300ms  */
    delay: number;
  }
) => {
  const { delay } = options || { delay: 300 };
  const Timer = useRef<NodeJS.Timeout>();
  const TimeStamp = useRef(NaN);
  const Count = useRef(0);

  const [dealing, setDealing] = useState(false);

  const returnMethod = useCallback(
    (...arg: Params) =>
      new Promise((resolve, reject) => {
        if (Timer.current) clearTimeout(Timer.current);
        if (Count.current === Number.MAX_SAFE_INTEGER) Count.current = 0;
        Count.current = Count.current + 1;
        const TimeStampClosure = +new Date() + Count.current;
        TimeStamp.current = TimeStampClosure;
        Timer.current = setTimeout(() => {
          setDealing(true);
          const count = Count.current;
          method(...arg)
            .then((res) => {
              if (TimeStamp.current === TimeStampClosure) {
                resolve(res);
                setDealing(false);
              }
              reject({ count, err: res });
            })
            .catch((err) => {
              if (TimeStamp.current === TimeStampClosure) {
                setDealing(false);
              }
              reject({
                count,
                err,
              });
            });
        }, delay);
      }),
    [delay, method]
  );

  return [returnMethod, dealing] as [(...arg: Params) => Promise<T>, boolean];
};

export default useAntiShake;
