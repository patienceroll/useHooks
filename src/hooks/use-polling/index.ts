import { useCallback, useRef, useMemo } from "react";

/** 轮询 */
const usePolling = <params extends any[] = unknown[]>(
  func: (...arg: params) => void,
  options?: { delay: number }
) => {
  const { delay } = options || { delay: 1000 };
  const Timer = useRef<NodeJS.Timeout>();

  const newFunc = useCallback(
    (...arg: params) => {
      func(...arg);
      Timer.current = setTimeout(() => {
        newFunc(...arg);
      }, delay);
    },
    [delay, func]
  );

  const method = useMemo(
    () => ({
      stop() {
        if (Timer.current) clearTimeout(Timer.current);
      },
      timer: Timer,
    }),
    []
  );

  return [newFunc, method] as const;
};

export default usePolling;
