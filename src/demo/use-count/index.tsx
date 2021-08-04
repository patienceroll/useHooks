import React, { useState } from "react";

import useCount from "../../hooks/use-count";

const useCountDemo = () => {
  const [init, setInit] = useState<number | undefined>(60);
  const [step, setStep] = useState<number | undefined>(1);
  const [during, setDuring] = useState<number | undefined>(1000);
  const [end, setEnd] = useState<number | undefined>(0);

  const { count, goOn, start, stop } = useCount(init || 60, {
    step,
    during,
    end,
  });

  return (
    <div>
      <div>
        <span>当前计数：{count}</span>
        <br />
        <br />
        <label>初始值&nbsp;</label>
        <input
          placeholder="初始值"
          type="number"
          defaultValue={init}
          onChange={(event) =>
            setInit(event.target.value ? Number(event.target.value) : undefined)
          }
        />
        &emsp; &emsp;
        <label>计数步频&nbsp;</label>
        <input
          placeholder="计数步频"
          type="number"
          defaultValue={step}
          onChange={(event) =>
            setStep(event.target.value ? Number(event.target.value) : undefined)
          }
        />
        &emsp; &emsp;
        <label>计数间隔&nbsp;</label>
        <input
          placeholder="计数间隔"
          type="number"
          defaultValue={during}
          onChange={(event) =>
            setDuring(
              event.target.value ? Number(event.target.value) : undefined
            )
          }
        />
        &emsp; &emsp;
        <label>计数终止值&nbsp;</label>
        <input
          placeholder="计数终止值"
          type="number"
          defaultValue={end}
          onChange={(event) =>
            setEnd(event.target.value ? Number(event.target.value) : undefined)
          }
        />
        <br />
        <br />
        <div>
          <button onClick={start}>开始计时</button>
          &emsp;
          <button onClick={stop}>暂停</button>
          &emsp;
          <button onClick={goOn}>继续</button>
        </div>
      </div>
    </div>
  );
};

export default useCountDemo;
