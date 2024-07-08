const LOGIN = {
	INIT: 'LOGIN_INIT',
	SUCCESS: 'LOGIN_SUCCESS',
	ERROR: 'LOGIN_ERROR',
	TERMINATE: 'LOGIN_TERMINATE'
}

export const initialState = {
  isLoggedIn: false,
  userData: undefined,
  role: undefined,
  token: '',
  error: ''
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN.INIT:
      return {
        ...state,
        error: ''
      };
    case LOGIN.SUCCESS:
      return {
        ...state,
        userData: action.payload,
        isLoggedIn: true
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
        isLoggedIn: false
      };
    default: {
      return state;
    }
  }
}
