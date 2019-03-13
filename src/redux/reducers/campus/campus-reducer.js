import * as actions from '../../actions';

// reducers

// handling campusIndex
export const campusIndex = (state = {}, action = {}) => {
  switch (action.type) {
    case actions.CHANGE_CAMPUS_AREA:
      return action.payload.campusIndex;
    default:
      return state;
  }
};

// handling PMData
/*
  PMData: {
    isFetching,
    error,
    data
 }
*/
export const fetchingPMData = (state = {}, action = {}) => {
  switch (action.type) {
    case actions.GET_PM_DATA_START:
      return {
        ...state,
        error: false,
        isFetching: action.payload.isFetching,
      };
    case actions.GET_PM_DATA_FAIL:
      return {
        ...state,
        error: action.payload.error,
        isFetching: action.payload.isFetching,
      };
    case actions.GET_PM_DATA_END:
      return {
        ...state,
        error: false,
        isFetching: action.payload.isFetching,
        data: action.payload.data
      };
    default:
      return state;
  }
};
