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
	return dispatch => {
		dispatch(setLoadingMessage('saving ...'));

		getRepository()
			.numbers('save', { number })
			.then(value => {
				dispatch(setLoadingMessage());
			});
	};
}

export function loadNumber() {
	return dispatch => {
		dispatch(setLoadingMessage('loading ...'));

		getRepository()
			.numbers('load')
			.then(value => {
				dispatch(setLoadingMessage());
				dispatch(setNumber(value));
			});
	};
}
