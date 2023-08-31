const usersState = [];

const usersReducer = (state = usersState, { type, data }) => {
  switch (type) {
    case 'SaveUsersAction':
      return data;
    case 'DeleteUserAction':
      return state.filter(v => v.id !== data);
    default:
      return state;
  }
}

export default usersReducer;


