import { Container, Skeleton, Stack } from '@mui/material';
import { IQuestionDetail, IUserInfo, ViewTypes } from '../../common/interfaces';

import NotFound from '../../pages/shared/notfound';
import QuestionAnswer from '../../components/QuestionAnswer';
import QuestionResult from '../../components/QuestionResult';
import React from 'react';
import { connect } from 'react-redux';

const LoadingSkeleton = () => {
  return (
    <Container>
      <Stack spacing={1} width={600}>
        <Skeleton animation="wave" variant="text" />
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Skeleton animation="wave" variant="rectangular" height={200} />
        <Stack direction={'row'}>
          <Skeleton animation="wave" variant="rectangular" width={100} height={40} />
          <Skeleton animation="wave" variant="rectangular" height={40} sx={{ ml: 2, width: 1 }} />
        </Stack>
      </Stack>
    </Container>
  );
};

const QuestionHandler = ({
  question,
  author,
  viewType,
  questionNotFound,
  loading,
}: {
  question: IQuestionDetail;
  author: IUserInfo;
  viewType: ViewTypes;
  questionNotFound: boolean;
  loading: boolean;
}) => {
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (questionNotFound) {
    return <NotFound rootStyle={{ paddingTop: 0, margin: 0 }} containerSx={{ marginLeft: 0 }} />;
  }

  if (viewType === 'answer') {
    return <QuestionAnswer question={question} author={author} />;
  }

  if (viewType === 'results') {
    return <QuestionResult question={question} author={author} />;
  }

  return <div>Invalid view type</div>;
};

const mapStateToProps = (state, ownerProps) => {
  const { authedUser, users, questions, loadingBar } = state;
  const { id: redirectedQuestionId } = ownerProps.routeProps?.match.params || {};

  const question = questions[redirectedQuestionId];
  const author = users[question?.author];
  const userAnswers = Object.keys(users[authedUser].answers);
  const isAnsweredQuestion = question && userAnswers.includes(question.id);
  const viewType: ViewTypes = isAnsweredQuestion ? 'results' : 'answer';
  const questionNotFound = redirectedQuestionId !== undefined && question === undefined;

  return {
    question,
    author,
    viewType,
    questionNotFound,
    loading: loadingBar.default === 1,
  };
};

export default connect(mapStateToProps)(QuestionHandler);
