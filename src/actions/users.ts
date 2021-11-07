import { IQuestionDetail, IUser } from '../common/interfaces';
import { getUsers, saveQuestionAnswer } from '../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

import { addAnswerToQuestion } from './questions';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';

export const receiveUsers = (users: IUser) => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};

export const addQuestionToUser = ({ id, author }: IQuestionDetail) => {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author,
  };
};

const addAnswerToUser = ({
  authedUserId,
  questionId,
  answer,
}: {
  authedUserId: string;
  questionId: string;
  answer: string;
}) => {
  return {
    type: ADD_ANSWER_TO_USER,
    authedUserId,
    questionId,
    answer,
  };
};

export const handleReceiveUserList = () => {
  return (dispatch) => {
    dispatch(showLoading());

    return getUsers()
      .then((users) => {
        dispatch(receiveUsers(users));
        dispatch(hideLoading());
      })
      .catch((e) => {
        console.warn('Error in handleReceiveUserList:', e);
      });
  };
};

export const handleSaveQuestionAnswer = ({
  authedUserId,
  questionId,
  answer,
}: {
  authedUserId: string;
  questionId: string;
  answer: string;
}) => {
  return (dispatch) => {
    dispatch(showLoading());

    return saveQuestionAnswer({ authedUserId, questionId, answer })
      .then(() => {
        dispatch(addAnswerToUser({ authedUserId, questionId, answer }));
        dispatch(addAnswerToQuestion({ authedUserId, questionId, answer }));
        dispatch(hideLoading());
      })
      .catch((e) => {
        console.warn('Error in handleSaveQuestionAnswer:', e);
      });
  };
};
