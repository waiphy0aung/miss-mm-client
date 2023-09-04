const categoryState = [];

const categoryReducer = (state = categoryState,{type,data}) => {
  switch(type){
    case 'SaveCategoryDataAction':
      return data;
    case 'AddCategoryAction': 
      return [...state,data];
    case 'UpdateCategoryAction':
      let tempData = [...state];
      tempData[tempData.findIndex(v => v._id === data._id)] = data;
      return tempData;
    case 'DeleteCategoryAction':
      return state.filter(v => v._id !== data);
    default: return state;
  }
}

export default categoryReducer
