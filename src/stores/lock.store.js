const lockState = {};

const lockReducer = (state = lockState,{type,data}) => {
  switch(type){
    case 'SaveLockAction':
      return data;
    default: return state;
  }
}

export default lockReducer
