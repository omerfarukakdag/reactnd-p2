import * as PagePaths from '../../../../router/paths';
import * as Yup from 'yup';

import { Box, Container, Stack, TextField, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';

import { LoadingButton } from '@mui/lab';
import React from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../../../../actions/questions';
import { useHistory } from 'react-router';

const NewQuestion = ({ dispatchAddQuestion, authedUser }) => {
  const history = useHistory();

  const NewQuestionSchema = Yup.object().shape({
    optionOne: Yup.string().min(2).required('Option one is required'),
    optionTwo: Yup.string().min(2).required('Option two is required'),
  });

  const onSubmit = (values) => {
    const question = {
      optionOneText: values.optionOne,
      optionTwoText: values.optionTwo,
      author: authedUser,
    };

    dispatchAddQuestion({ ...question }).then(() => {
      history.push(PagePaths.Dashboard);
    });
  };

  const formik = useFormik({
    initialValues: {
      optionOne: '',
      optionTwo: '',
    },
    validationSchema: NewQuestionSchema,
    onSubmit,
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          New Question
        </Typography>
      </Stack>
      <Box maxWidth="sm">
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                type="text"
                label="Enter option one..."
                {...getFieldProps('optionOne')}
                error={Boolean(touched.optionOne && errors.optionOne)}
                helperText={touched.optionOne && errors.optionOne}
              />
              <TextField
                fullWidth
                type="text"
                label="Enter option two..."
                {...getFieldProps('optionTwo')}
                error={Boolean(touched.optionTwo && errors.optionTwo)}
                helperText={touched.optionTwo && errors.optionTwo}
              />
              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                Submit
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    authedUser: state.authedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddQuestion: (question) => dispatch(handleAddQuestion(question)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
