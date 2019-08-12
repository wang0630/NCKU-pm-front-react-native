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

const initPMData = (selectedCampusId, data) => ({
  type: actionTypes.INIT_PM_DATA,
  payload: {
    selectedCampusId,
    data
  }
});

const appendPMData = (selectedCampusId, data) => ({
  type: actionTypes.APPEND_PM_DATA,
  payload: {
    selectedCampusId,
    data
  }
});

// 'http://140.116.82.93:6800'
// Async creator as a thunk
// return a function which accepts dispatch, getstate, and additional dependencies
export const getPMData = selectedCampusId => (dispatch, getstate, axios) => {
  // Inform redux that the fetching has started
  // show the spinner
  // dispatch(getPMDataStart(selectedCampusId));
  (async () => {
    try {
      console.log(`now appending id: ${selectedCampusId}`);
      const res = await axios.get(`http://140.116.82.93:6800/campus/${selectedCampusId}`);
      // append the newest data
      dispatch(appendPMData(selectedCampusId, res.data));
      // close the spinner
      // dispatch(getPMDataEnd(selectedCampusId));
    } catch (err) {
      // server made a response which falls out the 2xx
      if (err.response) {
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


export const getPMDataInit = selectedCampusId => (dispatch, getstate, axios) => {
  // Inform redux that the fetching has started
  // show the spinner
  dispatch(getPMDataStart(selectedCampusId));
  const t = async () => {
    try {
      console.log(`now init id: ${selectedCampusId}`);
      const res = await axios.get(`http://140.116.82.93:6800/campus/init/${selectedCampusId}`);
      // update the real data
      dispatch(initPMData(selectedCampusId, res.data));
      // close the spinner
      dispatch(getPMDataEnd(selectedCampusId));
    } catch (err) {
      if (err.response) {
        console.log('out of 2xx');
        console.log(err.response);
        dispatch(getPMDataFail(selectedCampusId, err.response.data));
      // request is sent but no response is made
      } else if (err.request) {
        console.log('no response');
        dispatch(getPMDataFail(selectedCampusId, err.request));
      } else {
        console.log(err);
        dispatch(getPMDataFail(selectedCampusId, 'Something went wrong'));
      }
    }
  };
  setTimeout(t, 1000);
  // (async () => {
  //   try {
  //     const res = await axios.get('http://140.116.82.93:6800/campus/init/6');
  //     // console.log(res.data);
  //     // update the real data
  //     dispatch(initPMData(selectedCampusId, res.data));
  //     // close the spinner
  //     dispatch(getPMDataEnd(selectedCampusId));
  //   } catch (err) {
  //     if (err.response) {
  //       console.log('out of 2xx');
  //       console.log(err.response);
  //       dispatch(getPMDataFail(selectedCampusId, err.response.data));
  //     // request is sent but no response is made
  //     } else if (err.request) {
  //       console.log('no response');
  //       dispatch(getPMDataFail(selectedCampusId, err.request));
  //     } else {
  //       console.log(err);
  //       dispatch(getPMDataFail(selectedCampusId, 'Something went wrong'));
  //     }
  //   }
  // })();
};

// mapsDispatchToProps
export const changeCampusArea = campusIndex => ({
  type: actionTypes.CHANGE_CAMPUS_AREA,
  payload: {
    campusIndex
  }
});
