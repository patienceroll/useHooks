import { useCallback, useRef, useState } from "react";

const useCount = (
  defaultCount: number,
  options?: {
    /** 计数步频,默认为 1 */
    step?: number;
    /** 计数间隔 单位为ms,默认 1000 */
    during?: number;
    /** 结束时的值,默认为0 */
    end?: number;
    /** #### 方向,默认减少
     * 1. increase 增加
     * 2. reduce 减少
     * */
    direction?: "increase" | "reduce";
  }
) => {
  const {
    step = 1,
    during = 1000,
    end = 0,
    direction = "reduce",
  } = options || {};

  const Timer = useRef<NodeJS.Timeout>();

  const [count, setCount] = useState(defaultCount);

  const startCount = useCallback(() => {
    Timer.current = setTimeout(() => {
      setCount((c) => {
        if (direction === "reduce") {
          if (c > end) return c - step;
          return end;
        } else {
          if (c < end) return c + step;
          return end;
        }
      });
    }, during);
  }, [direction, during, end, step]);

  const stop = useCallback(() => {
    if (Timer.current) clearTimeout(Timer.current);
  }, []);

  const restart = useCallback(() => {
    setCount(defaultCount);
    startCount();
  }, [defaultCount, startCount]);

  return { count, stop, restart };
};

export default useCount;
