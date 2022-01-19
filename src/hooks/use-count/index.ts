import { useCallback, useEffect, useRef, useState } from "react";

/** ## 计数
 * 可用于短信计时,秒表等场合
 * - defaultCount - 开始计数的初始值
 */
const useCount = (
  defaultCount: number,
  options: {
    /** 计数步频,默认为 1 */
    step?: number;
    /** 计数间隔 单位为ms,默认 1000 */
    during?: number;
    /** 结束时的值,默认为0 */
    end?: number;
  } = {}
) => {
  const { step = 1, during = 1000, end = 0 } = options;

  const Timer = useRef<NodeJS.Timeout>();

  const [count, setCount] = useState(defaultCount);

  const doCount = useCallback(
    (c: number) => {
      Timer.current = setTimeout(() => {
        if (defaultCount > end) {
          const next = c - step;
          if (next > end) {
            doCount(next);
            setCount(next);
          } else setCount(end);
        }
        if (defaultCount < end) {
          const next = c + step;
          if (next < end) {
            doCount(next);
            setCount(next);
          } else setCount(end);
        }
      }, during);
    },
    [defaultCount, during, end, step]
  );

  const stop = useCallback(() => {
    if (Timer.current) clearTimeout(Timer.current);
  }, []);

  const start = useCallback(() => {
    if (Timer.current) clearTimeout(Timer.current);
    setCount(defaultCount);
    doCount(defaultCount);
  }, [defaultCount, doCount]);

  const goOn = useCallback(() => {
    doCount(count);
  }, [count, doCount]);

  useEffect(() => {
    return () => {
      if (Timer.current) clearTimeout(Timer.current);
    };
  }, []);

  return { count, stop, start, goOn };
};

export default useCount;
