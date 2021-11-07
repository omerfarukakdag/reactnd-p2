import { IQuestion, IQuestionDetail } from '../common/interfaces';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

import { addQuestionToUser } from './users';
import { saveQuestion } from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';

const addQuestion = (question: IQuestionDetail) => {
  return {
    type: ADD_QUESTION,
    question,
  };
};

export const receiveQuestions = (questions: IQuestion) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

export const addAnswerToQuestion = ({
  authedUserId,
  questionId,
  answer,
}: {
  authedUserId: string;
  questionId: string;
  answer: string;
}) => {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authedUserId,
    questionId,
    answer,
  };
};

export const handleAddQuestion = ({
  optionOneText,
  optionTwoText,
  author,
}: {
  optionOneText: string;
  optionTwoText: string;
  author: string;
}) => {
  return (dispatch) => {
    dispatch(showLoading());

    return saveQuestion({ optionOneText, optionTwoText, author })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
        dispatch(hideLoading());
      })
      .catch((e) => {
        console.warn('Error in handleAddQuestion:', e);
      });
  };
};
