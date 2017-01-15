import { combineReducers } from 'redux';
import auth from './auth';
import linkReducer from './linkReducer';
import numberReducer from './numberReducer';

export default combineReducers({
	auth,
	linkReducer,
	numberReducer
});
