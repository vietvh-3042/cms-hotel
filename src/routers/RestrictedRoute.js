import React from "react";
import { Route, Redirect } from "react-router-dom";
import AsyncFunc from "../helpers/AsyncFunc";
const RestrictedRoute = ({
  component: Component,
  path,
  isLoggedIn,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <AsyncFunc>
            <Component {...props} />
          </AsyncFunc>
        ) : (
          <Redirect
            to={{
              pathname: "/signin"
            }}
          />
        )
      }
    />
  );
};

export default RestrictedRoute;
