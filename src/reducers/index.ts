import { LOGOUT_USER } from '../actions/authedUser';
import authedUser from './authedUser';
import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import questions from './questions';
import users from './users';

const appReducer = combineReducers({
  authedUser,
  users,
  questions,
  loadingBar: loadingBarReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
