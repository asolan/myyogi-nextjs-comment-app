import { combineReducers } from 'redux';

import UserData from './userData';
import SelectedQuotes from './selectedQuotes';

const rootReducer = combineReducers({
  userData: UserData,
  selectedQuotes: SelectedQuotes
});

export default rootReducer;
