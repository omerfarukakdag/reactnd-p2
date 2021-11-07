import { hideLoading, showLoading } from 'react-redux-loading-bar';

import { getInitialData } from '../utils/api';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';

const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading());

    return getInitialData()
      .then(({ questions, users }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(hideLoading());
      })
      .catch((e) => {
        console.warn('Error in handleInitialData:', e);
      });
  };
};

export default handleInitialData;
