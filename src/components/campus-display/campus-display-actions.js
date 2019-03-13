import * as actions from '../../redux/actions';

// normal sync action creators
const getPMDataStart = () => ({
  type: actions.GET_PM_DATA_START,
  payload: {
    isFetching: true
  }
});

const getPMDataEnd = data => ({
  type: actions.GET_PM_DATA_END,
  payload: {
    isFetching: false,
    data
  }
});

const getPMDataFail = () => ({
  type: actions.GET_PM_DATA_FAIL,
  payload: {
    isFetching: false,
    error: true
  }
});

// Async creator
export const getPMData = mockdata => (dispatch, getState, axios) => {
  // Inform redux that the fetching has started
  dispatch(getPMDataStart());
  (async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
      dispatch(getPMDataEnd(res.data));
    } catch (err) {
      dispatch(getPMDataFail());
    }
  })();
};


// mapsStateToProps
// get the whole state tree and return what component needs
// can access by this.props.campusIndex for example
export const getCurrentCampusArea = (state) => {
  const { campusIndex } = state;
  return { campusIndex };
};

// mapsDispatchToProps
export const changeCampusArea = campusIndex => ({
  type: actions.CHANGE_CAMPUS_AREA,
  payload: {
    campusIndex
  }
});