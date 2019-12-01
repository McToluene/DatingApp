import React, { FunctionComponent } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface IAuthRoute {
  Component: FunctionComponent<RouteProps>;
  exact: boolean;
  path: string;
}

const AuthenticatedRoute: React.FC<IAuthRoute> = ({ Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
