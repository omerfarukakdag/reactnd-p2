import { ADD_ANSWER_TO_USER, ADD_QUESTION_TO_USER, RECEIVE_USERS } from '../actions/users';

const users = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };

    case ADD_QUESTION_TO_USER:
      const { id, author } = action;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id),
        },
      };

    case ADD_ANSWER_TO_USER:
      const { authedUserId, questionId, answer } = action;
      return {
        ...state,
        [authedUserId]: {
          ...state[authedUserId],
          answers: {
            ...state[authedUserId].answers,
            [questionId]: answer,
          },
        },
      };
    default:
      return state;
  }
};

export default users;
