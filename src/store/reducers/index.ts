import { combineReducers } from 'redux';

import UserData from './userData';

const rootReducer = combineReducers({
  userData: UserData
});

export default rootReducer;
