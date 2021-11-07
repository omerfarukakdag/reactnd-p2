import { Avatar, Box, Drawer, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { MHidden } from '../../components/@material-extend';
import NavSection from '../../components/NavSection';
import Scrollbar from '../../components/Scrollbar';
import { connect } from 'react-redux';
import sidebarConfig from '../../common/sidebarConfig';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
}));

const Sidebar = ({ authUser, isOpenSidebar, onCloseSidebar }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' },
      }}>
      <Box sx={{ mt: 2, mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={authUser.avatarURL} alt="photoURL" sx={{ width: 48, height: 48 }} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {authUser.name}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>
      <NavSection navConfig={sidebarConfig} />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}>
          {renderContent}
        </Drawer>
      </MHidden>
      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
            },
          }}>
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
};

const mapStateToProps = (state, ownerProps) => {
  const { authedUser, users } = state;
  return {
    authUser: users[authedUser],
    isOpenSidebar: ownerProps.isOpenSidebar,
    onCloseSidebar: ownerProps.onCloseSidebar,
  };
};

export default connect(mapStateToProps)(Sidebar);
