const categoryState = [];

const categoryReducer = (state = categoryState,{type,data}) => {
  switch(type){
    case 'SaveCategoryDataAction':
      return data;
    case 'AddCategoryAction': 
      return [...state,data];
    case 'UpdateCategoryAction':
      let tempData = [...state];
      tempData[tempData.findIndex(v => v.id === data.id)] = data;
      return tempData;
    case 'DeleteCategoryAction':
      return state.filter(v => v.id !== data);
    default: return state;
  }
}

export default categoryReducer
