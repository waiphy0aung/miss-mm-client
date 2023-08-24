const usersState = [];

const usersReducer = (state = usersState, { type, data }) => {
  switch (type) {
    case 'SaveUsersAction':
      return data;
    default:
      return state;
  }
}

export default usersReducer;


