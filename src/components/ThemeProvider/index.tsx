import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import React, { ReactNode } from 'react';

import GlobalStyles from '@mui/material/GlobalStyles';

const globalStyle = {
  body: {
    backgroundColor: '#f4f6f8',
  },
  a: {
    textDecoration: 'none',
  },
};

const ThemeProvider = ({ theme, children }: { theme: Theme; children?: ReactNode }) => (
  <MuiThemeProvider theme={theme}>
    <GlobalStyles styles={globalStyle} />
    {children}
  </MuiThemeProvider>
);

export default ThemeProvider;
