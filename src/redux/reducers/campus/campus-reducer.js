import * as actionTypes from '../../action-types';
import campusNames from '../../../constants/campus-names';

// reducers

// handling selectedCampus
const initialSelectedCampus = {
  name: '成功',
  id: 0
};

export const selectedCampus = (state = initialSelectedCampus, action = {}) => {
  switch (action.type) {
    case actionTypes.CHANGE_CAMPUS_AREA: {
      console.log('where am I?');
      return {
        name: campusNames[action.payload.campusIndex],
        id: action.payload.campusIndex
      };
    }
    default:
      return state;
  }
};

// handling campus

const initialCampusInfo = {};

for (let i = 0; i < 7; i += 1) {
  initialCampusInfo[i] = {
    isFetching: false,
    isValidate: false,
    error: false,
    data: {}
  };
}

// handling campus
export const campusInfo = (state = initialCampusInfo, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_PM_DATA_START: {
      const id = action.payload.selectedCampusId;
      if (!state[id].isValidate) {
        return {
          ...state,
          [`${id}`]: fetchingPMData(state[id], action),
        };
      }
      return state;
    }
    case actionTypes.GET_PM_DATA_END: {
      const id = action.payload.selectedCampusId;
      return {
        ...state,
        [`${id}`]: fetchingPMData(state[id], action)
      };
    }
    default:
      return state;
  }
};

const initialPMData = {
  isFetching: false,
  isValidate: false,
  error: false,
  data: {}
};

// internal reducer which is not exposed to the global environment
export const fetchingPMData = (state = initialPMData, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_PM_DATA_START:
      return {
        ...state,
        error: false,
        isFetching: true
      };
    case actionTypes.GET_PM_DATA_FAIL:
      return {
        ...state,
        error: action.payload.error,
        isFetching: false,
        isValidate: false
      };
    case actionTypes.GET_PM_DATA_END: {
      console.log('should be here');
      return {
        error: false,
        isFetching: false,
        isValidate: true, // the newset data
        data: action.payload.data // bind the data
      };
    }
    default:
      return state;
  }
};
