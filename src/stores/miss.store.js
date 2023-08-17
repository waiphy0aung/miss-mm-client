const missState = [];

const missReducer = (state = missState, { type, data }) => {
  let tempData = [...state];
  switch (type) {
    case 'SaveMissDataAction':
      return data;
    case 'AddMissAction':
      return [...state, data]
    case 'UpdateMissAction':
      tempData[tempData.findIndex(v => v._id === data._id)] = data;
      return tempData;
    case 'DeleteMissAction':
      return state.filter(v => v._id !== data);
    case 'VoteMissAction':
      const index = tempData.findIndex(v => v._id === data._id);
      tempData[index].isVote[data.categoryName] = data.value;
      return tempData;
    default:
      return state;
  }
};

export default missReducer;

