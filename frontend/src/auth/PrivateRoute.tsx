import React from "react";
import type { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import type { RouteComponentProps } from "react-router";
import auth from "./auth-helper";
const { isAuthenticated } = auth;

interface PrivateRouteProps {
  component: FC<{ match: any }>;
  path: string;
}
const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
