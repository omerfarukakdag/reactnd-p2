import { IQuestionDetail, IStateData, IUser } from '../common/interfaces';
import { questions as QuestionsData, users as UsersData } from './data';

let users = UsersData;
let questions = QuestionsData;

const generateUID = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const getUsers = (): Promise<IUser> =>
  new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 500);
  });

export const getQuestions = () =>
  new Promise((res, rej) => {
    setTimeout(() => res({ ...questions }), 500);
  });

export const formatQuestion = ({
  optionOneText,
  optionTwoText,
  author,
}: {
  optionOneText: string;
  optionTwoText: string;
  author: string;
}): IQuestionDetail => {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
};

export const saveQuestion = (question): Promise<IQuestionDetail> => {
  return new Promise((res, rej) => {
    const authedUserId = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion,
      };

      users = {
        ...users,
        [authedUserId]: {
          ...users[authedUserId],
          questions: users[authedUserId].questions.concat([formattedQuestion.id]),
        },
      };

      res(formattedQuestion);
    }, 1000);
  });
};

export const saveQuestionAnswer = ({
  authedUserId,
  questionId,
  answer,
}: {
  authedUserId: string;
  questionId: string;
  answer: string;
}): Promise<void> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUserId]: {
          ...users[authedUserId],
          answers: {
            ...users[authedUserId].answers,
            [questionId]: answer as any,
          },
        },
      };

      questions = {
        ...questions,
        [questionId]: {
          ...questions[questionId],
          [answer]: {
            ...questions[questionId][answer],
            votes: questions[questionId][answer].votes.concat([authedUserId]),
          },
        },
      };

      res();
    }, 500);
  });
};

export const getInitialData = (): Promise<IStateData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        questions,
        users,
      });
    }, 1500);
  });
};
