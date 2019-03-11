const change = 'CHANGE_CAMPUS_AREA';

const changeCampusArea = (campusArea) => ({
  type: change,
  payload: {
    campusArea
  }
});

// const initialState = {

// }

export const campusReducer = (state = {}, action = {}) => {
  switch (action.type) {
  case change:
    console.log(state);
    return { data: 3 };

  default:
    return state;
  
  }
};
