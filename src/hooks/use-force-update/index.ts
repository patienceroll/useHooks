import { useCallback, useState } from "react";

const useForceUpdate = () => {
  const [, setState] = useState(false);

  const forceUpdate = useCallback(() => {
    setState((t) => !t);
  }, []);

  return forceUpdate;
};

export default useForceUpdate;
