import { createStore } from 'redux';
import { campusReducer } from './reducers/index';

export const store = createStore(campusReducer);
