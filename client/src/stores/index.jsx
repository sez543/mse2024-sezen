import {createContext, useContext, useReducer, useCallback} from 'react';

import {asyncer} from './middlewares';
import mainReducer, {initialState} from './reducers';

const GlobalStore = createContext({});

export const useGlobalStore = () => useContext(GlobalStore);

// eslint-disable-next-line react/prop-types
export default function Provider({children}) {
  const [state, dispatchBase] = useReducer(mainReducer, initialState);

  const dispatch = useCallback(asyncer(dispatchBase, state), []);

  return <GlobalStore.Provider value={{state, dispatch}}>{children}</GlobalStore.Provider>;
}
