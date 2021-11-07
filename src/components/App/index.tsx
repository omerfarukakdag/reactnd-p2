import 'react-toastify/dist/ReactToastify.css';

import * as PagePaths from '../../router/paths';

import { ToastContainer, ToastContainerProps } from 'react-toastify';

import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from '../../theme/globalStyles';
import { IAppProps } from '../../common/interfaces';
import LoadingBar from 'react-redux-loading-bar';
import ProtectedRouter from '../../router/protected';
import PublicRouter from '../../router/public';
import React from 'react';
import ScrollToTop from '../ScrollToTop';
import ThemeConfig from '../../theme';
import { connect } from 'react-redux';

const toastOptions: ToastContainerProps = {
  autoClose: 2000,
  draggable: false,
  position: 'bottom-right',
  newestOnTop: true,
  pauseOnHover: false,
};

const App = ({ authedUser }: IAppProps) => (
  <BrowserRouter basename={PagePaths.Base}>
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <LoadingBar style={{ backgroundColor: '#00AB55', height: '3px', zIndex: 1200 }} />
      <ToastContainer {...toastOptions} />
      {authedUser ? <ProtectedRouter /> : <PublicRouter />}
    </ThemeConfig>
  </BrowserRouter>
);

const mapStateToProps = (state) => {
  return { authedUser: state.authedUser };
};

export default connect(mapStateToProps)(App);
