import React, { useCallback, useEffect, useState } from "react";
import useAntiShake from "../../hooks/use-anti-shake";

import { createRandomInt } from "../../tools/math";

const useAntiShakeDemo = () => {
  const [count, setCount] = useState<number>();

  const randomTimeDo = useCallback(() => {
    const timeOut = createRandomInt([200, 1200]);
    console.log(timeOut);
    return new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(timeOut);
      }, timeOut);
    });
  }, []);

  const [randomTimeDoAntiShake, loading] = useAntiShake(randomTimeDo);

  useEffect(() => {
    const Timer = setInterval(() => {
      randomTimeDoAntiShake().catch((err) => {
        setCount(err.count);
      });
    }, 1000);
    return () => {
      clearInterval(Timer);
    };
  }, [randomTimeDoAntiShake]);

  return (
    <div>
      <div>
        <span>状态：</span>
        <span>{loading ? "执行中" : "未执行"}</span>
      </div>
      <div>
        <span>忽略的定时器：</span>
        <span style={{ color: "red" }}>
          第&nbsp;{typeof count === "number" ? count : "-"}&nbsp;次执行的操作
        </span>
      </div>
    </div>
  );
};

export default useAntiShakeDemo;
