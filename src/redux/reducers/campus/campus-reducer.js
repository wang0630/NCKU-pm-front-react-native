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
for (let i = 0; i < campusNames.length; i += 1) {
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
for (let i = 0; i < campusNames.length; i += 1) {
  initialPMData[i] = {
    pm25List: [],
    tempList: [],
    humidityList: [],
    position: i
  };
}

export const pmData = (state = initialPMData, action) => {
  // const id = action.payload ? action.payload.selectedCampusId : 0
  switch (action.type) {
    case actionTypes.INIT_PM_DATA: {
      const id = action.payload.selectedCampusId;
      const { pm25List, tempList, humidityList } = action.payload.data;
      // Convert the string representation of time to the Date object
      pm25List.forEach((item) => {
        item.time = new Date(item.time);
      });
      tempList.forEach((item) => {
        item.time = new Date(item.time);
      });
      humidityList.forEach((item) => {
        item.time = new Date(item.time);
      });
      console.log('before return init');
      return {
        ...state,
        [id]: {
          pm25List,
          tempList,
          humidityList,
          position: id
        }
      };
    }
    case actionTypes.APPEND_PM_DATA: {
      const id = action.payload.selectedCampusId;
      // Shollow copy the state array without the last (oldest) data
      const pm25List = state[id].pm25List.slice(0, -1);
      const tempList = state[id].tempList.slice(0, -1);
      const humidityList = state[id].humidityList.slice(0, -1);
      // Convert the string representation of time to the Date object
      const { avg_pm25: pm25, avg_temp: temp, avg_humidity: humidity } = action.payload.data;
      pm25.time = new Date(pm25.time);
      temp.time = new Date(temp.time);
      humidity.time = new Date(pm25.time);
      // Append the newest data to the head of the array by unshift
      pm25List.unshift(pm25);
      tempList.unshift(temp);
      humidityList.unshift(humidity);
      console.log('before return');
      return {
        ...state,
        [id]: {
          pm25List,
          tempList,
          humidityList,
          position: id
        }
      };
    }
    default:
      return state;
  }
};
