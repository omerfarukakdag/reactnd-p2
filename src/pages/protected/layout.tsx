import React, { useState } from 'react';

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { styled } from '@mui/material/styles';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleOpenSidebar = () => {
    setOpen(true);
  };

  const handleCloseSidebar = () => {
    setOpen(false);
  };

  return (
    <RootStyle>
      <Navbar onOpenSidebar={handleOpenSidebar} />
      <Sidebar isOpenSidebar={open} onCloseSidebar={handleCloseSidebar} />
      <MainStyle>{children}</MainStyle>
    </RootStyle>
  );
};

export default Layout;
