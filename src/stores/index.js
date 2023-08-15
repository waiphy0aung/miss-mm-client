import { combineReducers, legacy_createStore as createStore } from 'redux';
import mainReducer from './main';
import userReducer from './user.store';

const store = createStore(
	combineReducers({
		main: mainReducer,
    user: userReducer
	}),
);

export const dispatch = (type,data) => {
	store.dispatch({ type, data });
};

export default store;


