import * as actionTypes from '../../action-types';
import campusNames from '../../../constants/campus-names';

/*

  Update the selectedCampus field of the store
  Accept types:
  @ CHANGE_CAMPUS_AREA: Change the name and id of the field.

*/
const initialSelectedCampus = {
  name: '成功',
  id: 0
};

export const selectedCampus = (state = initialSelectedCampus, action = {}) => {
  switch (action.type) {
    case actionTypes.CHANGE_CAMPUS_AREA: {
      console.log('Enter selectedCampus reducer');
      return {
        name: campusNames[action.payload.campusIndex],
        id: action.payload.campusIndex
      };
    }
    default:
      return state;
  }
};

/*

  Update the campusInfo field of the store
  Accept types:
  @ GET_PM_DATA_START: Set the isFetching, isValidate is still cleared.
  @ GET_PM_DATA_END: Set the isValidate and isFetching is cleared.
  @ GET_PM_DATA_FAIL: Set error to the error message and clear isFetching.
  @ SHOULD_UPDATE_PM_DATA: Clear isValidate since time limit is passed.

*/

const initialCampusInfo = {};
for (let i = 0; i < 7; i += 1) {
  initialCampusInfo[i] = {
    isFetching: false,
    isValidate: false,
    error: false,
    data: i
  };
}
export const campusInfo = (state = initialCampusInfo, action) => {
  const id = action.payload ? action.payload.selectedCampusId : 0;
  switch (action.type) {
    case actionTypes.GET_PM_DATA_START: {
      return {
        ...state,
        [id]: {
          ...state[id],
          isFetching: true
        }
      };
    }
    case actionTypes.GET_PM_DATA_END: {
      return {
        ...state,
        [id]: {
          ...state[id],
          isFetching: false,
          isValidate: true
        }
      };
    }
    case actionTypes.GET_PM_DATA_FAIL: {
      return {
        ...state,
        [id]: {
          ...state[id],
          isFetching: false,
          error: action.payload.error
        }
      };
    }
    case actionTypes.SHOULD_UPDATE_PM_DATA: {
      return {
        ...state,
        [id]: {
          ...state[id],
          isValidate: false
        }
      };
    }
    default:
      return state;
  }
};

/*

  Update the pmData field of the store
  Accept types:
  @ UPDATE_PM_DATA: Update the real pmData according to the selecetedCampusId.

*/

const initialPMData = {};
for (let i = 0; i < 7; i += 1) {
  initialPMData[i] = {
    data: {},
    position: i
  };
}

export const pmData = (state = initialPMData, action) => {
  const id = action.payload ? action.payload.selectedCampusId : 0;
  switch (action.type) {
    case actionTypes.UPDATE_PM_DATA: {
      return {
        ...state,
        [id]: {
          data: action.payload.data,
          position: id
        }
      };
    }
    default:
      return state;
  }
};
