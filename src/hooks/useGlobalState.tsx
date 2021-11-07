import { GlobalStateContext } from '../context/GlobalStateProvider';
import { useContext } from 'react';

const useGlobalState = () => useContext(GlobalStateContext);

export default useGlobalState;
