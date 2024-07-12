import {useGlobalStore} from '../../stores/index';

import bindActions from '../../stores/bindActions';
import loginReducer from '../../stores/auth/context';

const {actions} = loginReducer;

/**
 * useLogin Custom Hook
 */
const useLogin = () => {
  const {state, dispatch} = useGlobalStore();

  // List of Props
  const {login} = state;

  // List of Actions
  const {handleLogin, handleLogout, handleRegister} = actions;

  // Bind Actions
  const loginActions = bindActions(
    {
      handleLogin,
      handleLogout,
      handleRegister
    },
    dispatch
  );

  return {...login, ...loginActions};
};

export default useLogin;
