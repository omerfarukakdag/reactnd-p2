import { useState } from 'react';

const useMergeState = (initial = {}): any[] => {
  const [state, set] = useState(initial);
  const setState = (updater) =>
    set((prevState) =>
      typeof updater === 'function' ? { ...prevState, ...updater(prevState) } : { ...prevState, ...updater },
    );

  return [state, setState];
};

export default useMergeState;
