import * as React from 'react';

import { Container, Stack, Typography } from '@mui/material';

import LoginForm from '../../../components/LoginForm';
import Page from '../../../components/Page';
import { styled } from '@mui/material/styles';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '80vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const Login = () => {
  const handleLogin = () => {};

  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 2 }}>
            <Typography variant="h4" gutterBottom>
              Would you rather ... ?
            </Typography>
            <Typography sx={{ color: 'text.secondary', mt: 1 }}>
              Select a user from the list and click the login button.
            </Typography>
          </Stack>
          <LoginForm onLogin={handleLogin} />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default Login;
