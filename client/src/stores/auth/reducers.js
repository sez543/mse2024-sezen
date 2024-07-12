import { AUTH_STORAGE_ID } from "./actions";

const LOGIN = {
	INIT: 'LOGIN_INIT',
	SUCCESS: 'LOGIN_SUCCESS',
	ERROR: 'LOGIN_ERROR',
	TERMINATE: 'LOGIN_TERMINATE'
};

export const initialLoginState = {
  isLoggedIn: false,
  userData: undefined,
  role: undefined,
  token: '',
  token_expiration: 0,
  token_start: 0,
  error: ''
};

export const getInitialLoginState = () => {
  const currentTimestamp = Date.now();

  try {
    const authStorageData = localStorage.getItem(AUTH_STORAGE_ID);
    const authStorageObject = authStorageData ? JSON.parse(authStorageData) : undefined;
    const tokenData = authStorageObject?.token;
    const userData = authStorageObject?.userData;

    if (!tokenData.value || !tokenData.start || tokenData.start + tokenData.expiration < currentTimestamp) {
      localStorage.removeItem(AUTH_STORAGE_ID);
      return initialLoginState;
    }

    return {
      isLoggedIn: true,
      userData: userData,
      role: userData?.role?.name,
      token: tokenData.value,
      token_expiration: tokenData.expiration,
      error: ''
    }
  } catch (e) {
    return initialLoginState;
  }
}

export function login(state = initialLoginState, action) {
  switch (action.type) {
    case LOGIN.INIT:
      return {
        ...state,
        error: ''
      };
    case LOGIN.SUCCESS:
      return {
        ...state,
        userData: action.payload.userData,
        role: action.payload.userData.role.name,
        token: action.payload.token.value,
        token_expiration: action.payload.token.expiration,
        token_start: Date.now(),
        isLoggedIn: true,
        error: ''
      };
    case LOGIN.ERROR:
      return {
        ...state,
        isLoggedIn: false,
        error: action.payload
      };
    case LOGIN.TERMINATE:
      return {
        ...state,
        uerData: undefined,
        token: undefined,
        token_expiration: 0,
        isLoggedIn: false
      };
    default: {
      return state;
    }
  }
}
