const userDefaultState = {};

const userReducer = (state = userDefaultState, { type, data }) => {
	switch (type) {
		case 'SaveUserDataAction':
			data.isLogin = true;
			return data;
		default:
			return state;
	}
};

export default userReducer;

