import { combineReducers } from 'redux';
import firstReducer from './firstReducer';

const rootReducer = combineReducers({
  first: firstReducer,
});

export default rootReducer;
