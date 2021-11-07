import * as PagePaths from './paths';

import { ProtectedRoutes, PublicRoutes, SharedRoutes } from './routes';
import { Redirect, Route, Switch } from 'react-router-dom';

import BaseRouteHandler from '../components/BaseRouteHandler';
import PublicLayout from '../pages/public/layout';
import React from 'react';

const Router = () => {
  const routes = [...SharedRoutes, ...PublicRoutes];
  const restrictedRoutes = [...ProtectedRoutes];

  return (
    <PublicLayout>
      <Switch>
        {restrictedRoutes.map((route) => (
          <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            render={(props) => <Redirect to={{ pathname: PagePaths.Login, state: { from: props.location } }} />}
          />
        ))}
        <Redirect exact from="/" to={PagePaths.Login} />
        {BaseRouteHandler(routes)}
        <Redirect to={PagePaths.NotFound} />
      </Switch>
    </PublicLayout>
  );
};

export default Router;
