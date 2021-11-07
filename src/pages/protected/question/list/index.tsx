import * as PagePaths from '../../../../router/paths';

import { Box, Button, Container, Grid, MenuItem, Skeleton, Stack, TextField, Typography } from '@mui/material';
import {
  IQuestionDetail,
  ISortOptions,
  ITabContext,
  ITabInfo,
  IUser,
  IUserInfo,
  SortByType,
} from '../../../../common/interfaces';
import React, { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import Question from '../../../../components/Question';
import { Link as RouterLink } from 'react-router-dom';
import SearchQuestion from '../../../../components/SearchQuestion';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { connect } from 'react-redux';
import plusFill from '@iconify/icons-eva/plus-fill';
import { styled } from '@mui/material/styles';

const SORT_OPTIONS: ISortOptions[] = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'nameAsc', label: 'Name Ascending' },
  { value: 'nameDesc', label: 'Name Descending' },
];

const TABS: ITabInfo = {
  unanswered: { title: 'Unanswered', index: 0 },
  answered: { title: 'Answered', index: 1 },
};

const RootStyle = styled('div')(({ theme }) => ({
  '& .MuiAutocomplete-root': {
    width: 200,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': {
      width: 240,
      '& .MuiAutocomplete-inputRoot': {
        boxShadow: (theme as any).customShadows.z12,
      },
    },
  },
  '& .MuiAutocomplete-inputRoot': {
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`,
    },
  },
  '& .MuiAutocomplete-option': {
    '&:not(:last-child)': {
      borderBottom: `solid 1px ${theme.palette.divider}`,
    },
  },
}));

const NoRowsOverlay = () => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '20vh' }}>
    <Grid item>No records to display</Grid>
  </Grid>
);

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}>
      <Box mt={2}>{children}</Box>
    </Typography>
  );
};

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
};

const QuestionList = ({ dispatch, answeredQuestions, unansweredQuestions, loading, users }) => {
  const skeletonArray = Array(10).fill('');
  const [value, setValue] = React.useState(0);
  const [sortByValue, setSortByValue] = useState<SortByType>('latest');
  const [answeredQuestionsState, setAnsweredQuestionsState] = useState([...answeredQuestions]);
  const [unAnsweredQuestionsState, setUnAnsweredQuestionsState] = useState([...unansweredQuestions]);

  useEffect(() => {
    setAnsweredQuestionsState(answeredQuestions);
  }, [answeredQuestions]);

  useEffect(() => {
    setUnAnsweredQuestionsState(unansweredQuestions);
  }, [unansweredQuestions]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const sortQuestions = (questions) => {
    switch (sortByValue) {
      case 'latest':
        return questions.sort((a, b) => b.timestamp - a.timestamp);
      case 'oldest':
        return questions.sort((a, b) => a.timestamp - b.timestamp);
      case 'nameAsc':
        return questions.sort((a, b) => a.user.name.localeCompare(b.user.name));
      case 'nameDesc':
        return questions.sort((a, b) => b.user.name.localeCompare(a.user.name));
      default:
        return questions;
    }
  };

  const tabComponentList: ITabContext[] = [
    { tabInfo: TABS.answered, data: sortQuestions(answeredQuestionsState), props: { answered: true } },
    { tabInfo: TABS.unanswered, data: sortQuestions(unAnsweredQuestionsState), props: { answered: false } },
  ];

  const onSort = (event) => {
    const { value } = event.target;
    setSortByValue(value);
  };

  const filterQuestion = (question: IQuestionDetail & { user?: IUserInfo }, filter: string): boolean => {
    if (!filter) {
      return false;
    }

    const filterValue = filter.toLocaleLowerCase();

    return (
      (question.user && question.user.name.toLocaleLowerCase().includes(filterValue)) ||
      question.optionOne.text.toLocaleLowerCase().includes(filterValue) ||
      question.optionTwo.text.toLocaleLowerCase().includes(filterValue)
    );
  };

  const handleSearchInputChange = (value) => {
    if (!value) {
      setAnsweredQuestionsState(answeredQuestions);
      setUnAnsweredQuestionsState(unansweredQuestions);
      return;
    }

    const answeredList = answeredQuestions.filter((item: IQuestionDetail) => filterQuestion(item, value));
    const unAnsweredList = unansweredQuestions.filter((item: IQuestionDetail) => filterQuestion(item, value));

    setAnsweredQuestionsState(answeredList);
    setUnAnsweredQuestionsState(unAnsweredList);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Questions
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to={PagePaths.NewQuestion}
          startIcon={<Icon icon={plusFill} />}>
          New Question
        </Button>
      </Stack>
      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <RootStyle>
          <SearchQuestion onInputChange={handleSearchInputChange} />
        </RootStyle>
        <TextField disabled={loading} select size="small" value={sortByValue} onChange={onSort}>
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Tabs
        value={value}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto">
        {Object.entries(TABS).map(([key, value]) => (
          <Tab disabled={loading} key={value.index} label={value.title} {...a11yProps(value.index)} />
        ))}
      </Tabs>
      {tabComponentList.map((item) => (
        <TabPanel key={item.tabInfo.index} value={value} index={item.tabInfo.index}>
          <Grid container spacing={3}>
            {loading ? (
              skeletonArray.map((item, index) => (
                <Grid key={index} item>
                  <Stack spacing={1} width={340}>
                    <Skeleton animation="wave" variant="text" />
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    <Skeleton animation="wave" variant="rectangular" height={90} />
                  </Stack>
                </Grid>
              ))
            ) : item.data.length === 0 ? (
              <NoRowsOverlay />
            ) : (
              item.data.map((question, index) => (
                <Grid key={question.id} item>
                  <Question id={question.id} answered={item.props.answered} />
                </Grid>
              ))
            )}
          </Grid>
        </TabPanel>
      ))}
    </Container>
  );
};

const mapStateToProps = ({
  authedUser,
  questions,
  users,
  loadingBar,
}: {
  authedUser: string;
  users: IUser;
  questions: IQuestionDetail;
  loadingBar: any;
}) => {
  const userAnswers = users[authedUser].answers;
  const answeredQuestionIds = Object.keys(userAnswers);

  const answeredQuestions = Object.values(questions)
    .filter((question) => answeredQuestionIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  const unansweredQuestions = Object.values(questions)
    .filter((question) => !answeredQuestionIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  answeredQuestions.forEach((question) => {
    question.user = users[question.author];
  });

  unansweredQuestions.forEach((question) => {
    question.user = users[question.author];
  });

  return {
    answeredQuestions,
    unansweredQuestions,
    loading: loadingBar.default === 1,
    users,
  };
};

export default connect(mapStateToProps)(QuestionList);
