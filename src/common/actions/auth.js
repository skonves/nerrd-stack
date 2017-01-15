import actionTypes from './action-types';
import { getRepository } from '../utils/repository';

function loginRequest() {
	return {
		type: actionTypes.LOGIN_REQUEST
	};
}

function loginSuccess({ username, avatarUri }) {
	return {
		type: actionTypes.LOGIN_SUCCESS,
		payload: {
			username,
			avatarUri
		}
	};
}

function loginFailed() {
	return {
		type: actionTypes.LOGIN_FAILED,
		payload: {}
	};
}

function logoutRequest() {
	return {
		type: actionTypes.LOGOUT_REQUEST,
		payload: {}
	};
}

function logoutSuccess() {
	return {
		type: actionTypes.LOGOUT_SUCCESS,
		payload: {}
	};
}

function logoutFailed() {
	return {
		type: actionTypes.LOGOUT_FAILED,
		payload: {}
	};
}

export function login({ username }) {
	return dispatch => {
		dispatch(loginRequest());

		getRepository()
			.auth('login', { username })
			.then(value => {
				dispatch(loginSuccess(value));
			})
			.catch(err => {
				console.log(err);
				dispatch(loginFailed());
			});
	};
}

export function logout() {
	return dispatch => {
		dispatch(logoutRequest());

		getRepository()
			.auth('logout', {})
			.then(value => {
				dispatch(logoutSuccess());
			})
			.catch(err => {
				console.log(err);
				dispatch(logoutFailed());
			});
	};
}
