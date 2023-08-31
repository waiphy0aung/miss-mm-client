const missState = [];

const missReducer = (state = missState, { type, data }) => {
  let tempData = [...state];
  switch (type) {
    case 'SaveMissDataAction':
      return data;
    case 'AddMissAction':
      return [...state, data]
    case 'UpdateMissAction':
      tempData[tempData.findIndex(v => v.id === data.id)] = data;
      console.log("tempData ===>",tempData)
      return tempData;
    case 'DeleteMissAction':
      return state.filter(v => v.id !== data);
    case 'VoteMissAction':
      const index = tempData.findIndex(v => v.id === data.id);
      tempData[index].isVote[data.categoryName] = data.value;
      return tempData;
    default:
      return state;
  }
};

export default missReducer;

