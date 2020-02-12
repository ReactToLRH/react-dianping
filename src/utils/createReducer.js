const createReducer = (name) => {
  return (state = {}, action) => {
    if(action.response && action.response.products) {
      return {...state, ...action.response.products}
    }
    return state;
  }
};

export default createReducer;
