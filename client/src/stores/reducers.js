import {getInitialLoginState, login as loginReducer} from './auth/reducers';

export const initialState = {
	login: getInitialLoginState()
}

export default function mainReducer(state, action) {
	const { login } = state;

	const currentState = {
		login: loginReducer(login, action)
	};

	return currentState;
}