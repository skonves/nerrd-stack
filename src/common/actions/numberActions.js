import actionTypes from '../constants/actionTypes';

import { getRepository } from '../utils/repository';

export function setNumber(number) {
	return {
		type: actionTypes.SET_NUMBER,
		payload: { number }
	};
}

export function setLoadingMessage(message) {
	return {
		type: actionTypes.SET_LOADING_MESSAGE,
		payload: { message }
	};
}

export function increment() {
	return {
		type: actionTypes.INCREMENT_NUMBER
	};
}

export function decrement() {
	return {
		type: actionTypes.DECREMENT_NUMBER
	};
}

export function saveNumber(number) {
	return async dispatch => {
		dispatch(setLoadingMessage('saving ...'));

		await getRepository().numbers('save', { number });
		dispatch(setLoadingMessage());
	};
}

export function loadNumber() {
	return async dispatch => {
		dispatch(setLoadingMessage('loading ...'));

		const value = await getRepository().numbers('load');
		dispatch(setLoadingMessage());
		dispatch(setNumber(value));
	};
}
