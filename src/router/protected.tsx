import * as PagePaths from './paths';

import { ProtectedRoutes, SharedRoutes } from './routes';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import BaseRouteHandler from '../components/BaseRouteHandler';
import { ILocationParams } from '../common/interfaces';
import ProtectedLayout from '../pages/protected/layout';
import React from 'react';

const Router = () => {
  const routes = [...SharedRoutes, ...ProtectedRoutes];
  const restrictedRoutes = [PagePaths.Login];

  const { state } = useLocation<ILocationParams<any>>();

  return (
    <ProtectedLayout>
      <Switch>
        {restrictedRoutes.map((route) => (
          <Route key={route} exact={true} path={route} render={(props) => <Redirect to={state?.from || '/'} />} />
        ))}
        <Redirect exact from="/" to={PagePaths.Dashboard} />
        {BaseRouteHandler(routes)}
        <Redirect to={PagePaths.NotFound} />
      </Switch>
    </ProtectedLayout>
  );
};

export default Router;
