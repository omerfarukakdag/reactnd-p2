import { Box, Button, Container, Typography } from '@mui/material';
import { MotionContainer, varBounceIn } from '../../../components/Animate';
import React, { CSSProperties } from 'react';
import { Theme, styled } from '@mui/material/styles';

import NotFoundSvg from '../../../assets/404.svg';
import Page from '../../../components/Page';
import { Link as RouterLink } from 'react-router-dom';
import { SxProps } from '@mui/system';
import { motion } from 'framer-motion';

const RootStyle = styled(Page)(({ theme, style }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: style ? style.paddingTop : theme.spacing(10),
  paddingBottom: style ? style.paddingBottom : theme.spacing(10),
}));

const NotFound = ({ rootStyle, containerSx }: { rootStyle?: CSSProperties; containerSx: SxProps<Theme> }) => {
  return (
    <RootStyle style={rootStyle}>
      <Container sx={containerSx}>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                Sorry, page not found!
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check
              your spelling.
            </Typography>
            <motion.div variants={varBounceIn}>
              <Box component="img" src={NotFoundSvg} sx={{ mx: 'auto', my: { xs: 1, sm: 2 } }} />
            </motion.div>
            <Button to="/" size="large" variant="contained" sx={{ textTransform: 'none' }} component={RouterLink}>
              Go to Home
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
};

export default NotFound;
