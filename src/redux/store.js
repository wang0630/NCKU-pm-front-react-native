import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { composeWithDevTools } from 'remote-redux-devtools';
import { selectedCampus, campusInfo } from './reducers/index';

// campusIndex: campusReducer(state.campusIndex, action)
// the key here represents the key in the actual store
const reducer = combineReducers({
  selectedCampus,
  campusInfo
});

export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument(axios))
));
