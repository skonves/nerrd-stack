import actionTypes from '../actions/action-types';

function loggingIn(state, action) {
	return {
		...state,
		isLoggingIn: true
	};
}

function loggingOut(state, action) {
	return {
		...state,
		isLoggingOut: true
	};
}

function loggedIn(state, action) {
	return {
		...state,
		isLoggingIn: false,
		isAuthenticated: true,
		username: action.payload.username,
		avatarUri: action.payload.avatarUri
	};
}

function clearUser(state, action) {
	return {
		...state,
		isLoggingIn: false,
		isLoggingOut: false,
		isAuthenticated: false,
		username: undefined,
		avatarUri: undefined
	};
}

export default function (state = {}, action) {
	console.log(action.type);
	switch (action.type) {
		case actionTypes.LOGIN_REQUEST:
			return loggingIn(state, action);
		case actionTypes.LOGIN_SUCCESS:
			return loggedIn(state, action);
		case actionTypes.LOGIN_FAILED:
		case actionTypes.LOGOUT_SUCCESS:
			return clearUser(state, action);
		default:
			return state;
	}
}
