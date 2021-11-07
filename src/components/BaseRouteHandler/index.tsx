import Head from '../Head';
import { IRoute } from '../../common/interfaces';
import React from 'react';
import { Route } from 'react-router-dom';

const renderRoute = (routeItem: IRoute, routeProps) => {
  if (!routeItem.component) {
    throw new Error(`Route component is required but not provided. (path: ${routeItem.path})`);
  }

  const componentProps = Object.assign({}, routeItem.componentProps);

  const appendWrapper = (children: React.ReactNode) => (
    <routeItem.wrapper {...routeItem.wrapperProps}>{children}</routeItem.wrapper>
  );

  const routeComponent = (
    <routeItem.component routeProps={routeProps} componentProps={componentProps}></routeItem.component>
  );

  return (
    <React.Fragment>
      <Head {...routeItem.headerProps} />
      {routeItem.wrapper ? appendWrapper(routeComponent) : routeComponent}
    </React.Fragment>
  );
};

const BaseRouteHandler = (routes: IRoute[]) =>
  routes &&
  routes.map((routeItem, key) => (
    <Route
      key={key}
      exact={routeItem.exact}
      path={routeItem.path}
      render={(routeProps) => renderRoute(routeItem, routeProps)}
    />
  ));

export default BaseRouteHandler;
