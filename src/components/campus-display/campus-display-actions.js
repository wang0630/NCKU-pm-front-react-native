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

// Async creator as a thunk
// return a function which accepts dispatch, getstate, and additional dependencies
export const getPMData = selectedCampusId => (dispatch, getState, axios) => {
  // Inform redux that the fetching has started
  dispatch(getPMDataStart(selectedCampusId));
  (async () => {
    try {
      const res = await axios.post('http://140.116.82.93:6800', {
        position: 5
      });
      dispatch(getPMDataEnd(selectedCampusId, res.data));
    } catch (err) {
      // server made a response which falls out the 2xx
      if (err.response) {
        console.log('out of 2xx');
        console.log(err);
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
