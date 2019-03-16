import * as actionTypes from '../../redux/action-types';

// normal sync action creators used in async creator
const getPMDataStart = selectedCampusId => ({
  type: actionTypes.GET_PM_DATA_START,
  payload: {
    selectedCampusId
  }
});

const getPMDataEnd = (selectedCampusId, data) => ({
  type: actionTypes.GET_PM_DATA_END,
  payload: {
    selectedCampusId,
    data
  }
});

const getPMDataFail = (selectedCampusId, error) => ({
  type: actionTypes.GET_PM_DATA_FAIL,
  payload: {
    selectedCampusId,
    error
  }
});

const updatePMData = (selectedCampusId, data) => ({
  type: actionTypes.UPDATE_PM_DATA,
  payload: {
    selectedCampusId,
    data
  }
});

// helper
const getIsValidate = (state, selectedCampusId) => state.campusInfo[selectedCampusId].isValidate;

// 'http://140.116.82.93:6800'
// Async creator as a thunk
// return a function which accepts dispatch, getstate, and additional dependencies
export const getPMData = selectedCampusId => (dispatch, getState, axios) => {
  // check if the data is outdated
  if (getIsValidate(getState(), selectedCampusId)) {
    // no need updating
    console.log('nope');
  } else {
    // Inform redux that the fetching has started
    // show the spinner
    dispatch(getPMDataStart(selectedCampusId));
    (async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        // update the real data
        dispatch(updatePMData(selectedCampusId, res.data));
        // set isValidate to true and close the spinner
        dispatch(getPMDataEnd(selectedCampusId));
      } catch (err) {
        // server made a response which falls out the 2xx
        if (err.response) {
          console.log('out of 2xx');
          console.log(err.response);
          dispatch(getPMDataFail(selectedCampusId, err.response.data));
        // request is sent but no response is made
        } else if (err.request) {
          console.log('no response');
          dispatch(getPMDataFail(selectedCampusId, err.request));
        } else {
          console.log('something uncertain');
          dispatch(getPMDataFail(selectedCampusId, 'Something went wrong'));
        }
      }
    })();
  }
};


// mapsStateToProps
// get the whole state tree and return what component needs
// can access by this.props.campusInfo for example
export const getCurrentCampusInfo = (state) => {
  const { selectedCampus, campusInfo } = state;
  return { selectedCampus, campusInfo };
};

// mapsDispatchToProps
export const changeCampusArea = campusIndex => ({
  type: actionTypes.CHANGE_CAMPUS_AREA,
  payload: {
    campusIndex
  }
});

export const setInvalidate = () => ({
  type: actionTypes.SHOULD_UPDATE_PM_DATA,
});
