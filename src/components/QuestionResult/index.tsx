import * as PagePaths from '../../router/paths';

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
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { QuestionOption } from '../../common/interfaces';
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { connect } from 'react-redux';
import { formatDate } from '../../utils/helpers';
import { useHistory } from 'react-router';

const LinearProgressWithLabel = (props: LinearProgressProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} sx={{ height: 7 }} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" fontWeight="bold" color="text.secondary">{`${props.value?.toFixed(
          0,
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

const YourVote = () => (
  <Stack direction={'row'} mt={-1}>
    <StarIcon color={'warning'} />
    <Typography variant="body2" fontStyle="italic" color="text.secondary">
      your vote
    </Typography>
  </Stack>
);

const QuestionResult = ({ authedUser, users, question, author }) => {
  const history = useHistory();

  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const votesTotal = optionOneVotes + optionTwoVotes;
  const userAnswer: QuestionOption = users[authedUser].answers[question.id];

  const handleNavigateClick = () => {
    history.push(PagePaths.Dashboard);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Results
        </Typography>
      </Stack>
      <Box maxWidth="sm">
        <Card>
          <CardHeader
            avatar={<Avatar aria-label="recipe" sx={{ width: 48, height: 48 }} src={author.avatarURL}></Avatar>}
            title={author.name}
            subheader={formatDate(question.timestamp)}
          />
          <CardContent>
            <Stack spacing={3}>
              <Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body1" fontWeight="bold" color="text.secondary">
                    {question.optionOne.text}
                  </Typography>
                  {userAnswer === 'optionOne' && <YourVote />}
                </Box>
                <LinearProgressWithLabel value={(optionOneVotes / votesTotal) * 100} />
                <Typography variant="body2" color="text.secondary">
                  {optionOneVotes} out of {votesTotal} votes
                </Typography>
              </Box>
              <Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body1" fontWeight="bold" color="text.secondary">
                    {question.optionTwo.text}
                  </Typography>
                  {userAnswer === 'optionTwo' && <YourVote />}
                </Box>
                <LinearProgressWithLabel value={(optionTwoVotes / votesTotal) * 100} />
                <Typography variant="body2" color="text.secondary">
                  {optionTwoVotes} out of {votesTotal} votes
                </Typography>
              </Box>
            </Stack>
          </CardContent>
          <CardActions disableSpacing style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              size="small"
              sx={{ textTransform: 'none' }}
              onClick={handleNavigateClick}
              startIcon={<HomeOutlinedIcon />}>
              Return to Dashboard
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state, ownerProps) => {
  const { authedUser, users } = state;
  const { question, author } = ownerProps;

  return {
    authedUser,
    users,
    question,
    author,
  };
};

export default connect(mapStateToProps)(QuestionResult);
