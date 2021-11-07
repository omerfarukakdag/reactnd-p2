import React, { useMemo } from 'react';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import shadows, { customShadows } from './shadows';

import { CssBaseline } from '@mui/material';
import componentsOverride from './overrides';
import palette from './palette';
import shape from './shape';
import typography from './typography';

const ThemeConfig = ({ children }) => {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows,
    }),
    [],
  );

  const theme = createTheme(themeOptions as any);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeConfig;
