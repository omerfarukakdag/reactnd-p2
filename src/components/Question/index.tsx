import * as PagePaths from '../../router/paths';

import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { IQuestionDetail, IUserInfo } from '../../common/interfaces';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone';
import React from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../../utils/helpers';
import { useHistory } from 'react-router-dom';

const Question = ({
  question,
  author,
  answered,
}: {
  question: IQuestionDetail;
  author: IUserInfo;
  answered: boolean;
}) => {
  const history = useHistory();

  if (!question) {
    return <p>This question doesn't exist</p>;
  }

  const handleActionClick = () => {
    history.push(`${PagePaths.QuestionDetailRedirectionPath}/${question.id}`);
  };

  return (
    <Card
      sx={{
        width: 340,
        mb: 2,
      }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe" sx={{ width: 48, height: 48 }} src={author.avatarURL}></Avatar>}
        title={author.name}
        subheader={formatDate(question.timestamp)}
      />
      <CardContent sx={{ height: 100, padding: '15px 15px 5px 24px' }}>
        <Typography variant="body1" fontStyle="italic" color="text.secondary" mb={0.5}>
          Would you rather
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {question.optionOne.text} <strong>{` or ${answered ? '' : '...'}`}</strong>
          {answered && question.optionTwo.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          color={answered ? 'secondary' : 'primary'}
          variant="outlined"
          size="small"
          startIcon={answered ? <InsertChartOutlinedTwoToneIcon /> : <CheckCircleOutlineIcon />}
          onClick={handleActionClick}>
          {answered ? 'Results' : 'Answer'}
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state, ownerProps) => {
  const { users, questions } = state;
  const { id: questionId, answered } = ownerProps;

  const question = questions[questionId];
  const author = users[question?.author];

  return {
    question,
    author,
    answered,
  };
};

export default connect(mapStateToProps)(Question);
