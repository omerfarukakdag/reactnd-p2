import { Box } from '@mui/material';
import React from 'react';
import { motion } from 'framer-motion';
import { varWrapEnter } from './variants';

const MotionContainer = ({ open, children, ...other }) => {
  return (
    <Box component={motion.div} initial={false} animate={open ? 'animate' : 'exit'} variants={varWrapEnter} {...other}>
      {children}
    </Box>
  );
};

export default MotionContainer;
