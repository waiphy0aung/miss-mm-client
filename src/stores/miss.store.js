const missState = [];

const missReducer = (state = missState, { type, data }) => {
	switch (type) {
		case 'SaveMissDataAction':
			return data;
    case 'AddMissAction':
      return [...state,data]
    case 'UpdateMissAction':
      let tempData = [...state];
      tempData[tempData.findIndex(v => v._id === data._id)] = data;
      return tempData;
    case 'DeleteMissAction':
      return state.filter(v => v._id !== data);
		default:
			return state;
	}
};

export default missReducer;

