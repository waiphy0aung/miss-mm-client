import { combineReducers, legacy_createStore as createStore } from 'redux';
import mainReducer from './main';
import userReducer from './user.store';
import missReducer from './miss.store';
import categoryReducer from './category.store';
import lockReducer from './lock.store';

const store = createStore(
	combineReducers({
		main: mainReducer,
    user: userReducer,
    misses: missReducer,
    categories: categoryReducer,
    lock: lockReducer
	}),
);

export const dispatch = (type,data) => {
	store.dispatch({ type, data });
};

export default store;


