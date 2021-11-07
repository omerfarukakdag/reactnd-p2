import React, { createContext } from 'react';

import { IGlobalState } from '../common/interfaces';
import useMergeState from '../hooks/useMergeState';

const initialGlobalState: IGlobalState = {
  globalState: {},
  setGlobalState: () => {},
};

const GlobalStateContext = createContext(initialGlobalState);

const GlobalStateProvider = ({ children }: { children?: React.ReactNode }) => {
  const [globalState, setGlobalState] = useMergeState({ ...initialGlobalState.globalState });

  return <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>{children}</GlobalStateContext.Provider>;
};

export { initialGlobalState, GlobalStateContext, GlobalStateProvider };
