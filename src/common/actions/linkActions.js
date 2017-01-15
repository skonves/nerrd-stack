import actionTypes from '../constants/actionTypes';
import Action from '../utils/Action';

export function addLink(url) {
	return new Action({
		type: actionTypes.ADD_LINK,
		payload: { url }
	});
}
