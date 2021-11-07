import * as PagePaths from './paths';

import ContentWrapper from '../components/ContentWrapper';
import Dashboard from '../pages/protected/dashboard';
import { HeaderInfo } from '../common/headerConfig';
import { IRoute } from '../common/interfaces';
import Leaderboard from '../pages/protected/leaderboard';
import Login from '../pages/public/login';
import Logout from '../pages/protected/logout';
import NewQuestion from '../pages/protected/question/new';
import NotFound from '../pages/shared/notfound';
import QuestionDetail from '../pages/protected/question/detail';

const SharedRoutes: IRoute[] = [
  {
    path: `${PagePaths.NotFound}`,
    exact: true,
    wrapper: ContentWrapper,
    wrapperProps: {},
    component: NotFound,
    headerProps: HeaderInfo.NotFound,
  },
];

const PublicRoutes: IRoute[] = [
  {
    path: `${PagePaths.Login}`,
    exact: true,
    wrapper: ContentWrapper,
    wrapperProps: {},
    component: Login,
    headerProps: HeaderInfo.Login,
  },
];

const ProtectedRoutes: IRoute[] = [
  {
    path: `${PagePaths.Dashboard}`,
    exact: true,
    wrapper: ContentWrapper,
    wrapperProps: {},
    component: Dashboard,
    headerProps: HeaderInfo.Dashboard,
  },
  {
    path: `${PagePaths.Leaderboard}`,
    exact: true,
    wrapper: ContentWrapper,
    wrapperProps: {},
    component: Leaderboard,
    headerProps: HeaderInfo.LeaderBoard,
  },
  {
    path: `${PagePaths.NewQuestion}`,
    exact: true,
    wrapper: ContentWrapper,
    wrapperProps: {},
    component: NewQuestion,
    headerProps: HeaderInfo.NewQuestion,
  },
  {
    path: `${PagePaths.QuestionDetail}`,
    exact: true,
    wrapper: ContentWrapper,
    wrapperProps: {},
    component: QuestionDetail,
    headerProps: HeaderInfo.QuestionDetail,
  },
  {
    path: `${PagePaths.Logout}`,
    exact: true,
    wrapper: ContentWrapper,
    wrapperProps: {},
    component: Logout,
    headerProps: HeaderInfo.Logout,
  },
];

export { SharedRoutes, PublicRoutes, ProtectedRoutes };
