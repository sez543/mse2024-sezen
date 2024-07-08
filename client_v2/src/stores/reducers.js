import loginReducer from './auth/reducers';

export const initialState = {
	login: loginReducer.initialState
}

export default function mainReducer(state, action) {
	const { login } = state;

	const currentState = {
		login: loginReducer.reducer(login, action)
	};

	return currentState;
}