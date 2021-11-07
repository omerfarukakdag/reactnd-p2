import React, { forwardRef } from 'react';

import { Box } from '@mui/material';
import { IPageProps } from '../../common/interfaces';

const Page = forwardRef<any, IPageProps>(({ children, ...rest }, ref) => (
  <Box ref={ref} {...rest}>
    {children}
  </Box>
));

export default Page;
