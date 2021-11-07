import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Stack,
  Typography,
} from '@mui/material';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../../utils/helpers';
import { handleSaveQuestionAnswer } from '../../actions/users';

const QuestionAnswer = ({ dispatch, authedUser, question, author }) => {
  const [answer, setAnswer] = React.useState('');

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAnswer(value);
  };

  const handleSubmit = () => {
    if (!answer) {
      return;
    }

    dispatch(handleSaveQuestionAnswer({ authedUserId: authedUser, questionId: question.id, answer }));
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Answer the Question
        </Typography>
      </Stack>
      <Box maxWidth="sm" height="lg">
        <Card>
          <CardHeader
            avatar={<Avatar aria-label="recipe" sx={{ width: 48, height: 48 }} src={author.avatarURL}></Avatar>}
            title={`${author.name} asks:`}
            subheader={formatDate(question.timestamp)}
          />
          <CardContent>
            <FormControl component="fieldset">
              <FormLabel component="legend">Would you rather</FormLabel>
              <RadioGroup aria-label="option" name="radio-buttons-group" value={answer} onChange={handleAnswerChange}>
                <FormControlLabel value="optionOne" control={<Radio />} label={question.optionOne.text} />
                <FormControlLabel value="optionTwo" control={<Radio />} label={question.optionTwo.text} />
              </RadioGroup>
            </FormControl>
          </CardContent>
          <CardActions disableSpacing>
            <Button variant="outlined" size="large" disabled={answer === ''} onClick={handleSubmit}>
              Submit
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state, ownerProps) => {
  const { authedUser } = state;
  const { question, author } = ownerProps;

  return {
    authedUser,
    question,
    author,
  };
};

export default connect(mapStateToProps)(QuestionAnswer);
