const mainState = {
	error: { message: undefined, detail: undefined, solution: undefined },
};

const mainReducer = (state = mainState, { type, data }) => {
	switch (type) {
		case 'ShowErrorHandler':
			return { ...state, error: data };
		default:
			return state;
	}
};

export default mainReducer;



