const lockState = false;

const lockReducer = (state = lockState,{type,data}) => {
  switch(type){
    case 'SaveLockAction':
      return data;
    case 'SetLockAction': 
      return data;
    default: return state;
  }
}

export default lockReducer
