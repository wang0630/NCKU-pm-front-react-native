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
  @ INIT_PM_DATA: Init the data by fetching the data of the last 6 hours.

*/

const initialCampusInfo = {};
for (let i = 0; i < 7; i += 1) {
  initialCampusInfo[i] = {
    isFetching: false,
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
  @ APPEND_PM_DATA: append the real pmData according to the selecetedCampusId.

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
  // const id = action.payload ? action.payload.selectedCampusId : 0
  switch (action.type) {
    case actionTypes.INIT_PM_DATA: {
      return {
        ...state,
        [id]: {
          data: action.payload.data,
          position: id
        }
      };
    }
    case actionTypes.APPEND_PM_DATA: {
      // Remove the oldest data
      state[id].data.pm25List.pop();
      state[id].data.tempList.pop();
      state[id].data.humidityList.pop();
      // Append the newest data to the head of the array by unshift
      state[id].data.pm25List.unshift(action.payload.data.avg_pm25);
      state[id].data.tempList.unshift(action.payload.data.avg_temp);
      state[id].data.humidityList.unshift(action.payload.data.avg_humidity);
      return state;
    }
    default:
      return state;
  }
};
