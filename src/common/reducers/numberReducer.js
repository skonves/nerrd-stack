import actionTypes from '../constants/actionTypes';

function setNumber(state, action) {
	let newState = { ...state };

	newState.number = action.payload.number;

	return newState;
}

function increment(state, action) {
	let newState = { ...state };

	newState.number = (newState.number || 0) + 1;

	return newState;
}

function decrement(state, action) {
	let newState = { ...state };

	newState.number = (newState.number || 0) - 1;

	return newState;
}

function setLoadingMessage(state, action) {
	let newState = { ...state };

	newState.message = action.payload.message;

	return newState;
}

export default function (state = { number: 1337 }, action) {
	switch (action.type) {
		case actionTypes.SET_NUMBER:
			return setNumber(state, action);
		case actionTypes.INCREMENT_NUMBER:
			return increment(state, action);
		case actionTypes.DECREMENT_NUMBER:
			return decrement(state, action);
		case actionTypes.SET_LOADING_MESSAGE:
			return setLoadingMessage(state, action);
		default:
			return state;
	}
}
