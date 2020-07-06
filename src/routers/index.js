import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Route, Switch } from "react-router-dom";
import ManagerHotel from "@Containers/ManagerHotel";
import NotFound from "../containers/pages/NotFound";
import Sigin from "../containers/pages/Signin";
import RestrictedRoute from "./RestrictedRoute";
import { useSelector } from "react-redux";

function PublicRoutes(props) {
  const { history } = props;
  console.log(history);
  const isLoggedIn = useSelector((state) => state.Auth.loggedIn);
  return (
    <ConnectedRouter history={history}>
      <Switch>
        {isLoggedIn ? (
          <RestrictedRoute
            path={"/"}
            exact={true}
            component={ManagerHotel}
            isLoggedIn={isLoggedIn}
          />
        ) : (
          <Route exact={true} path={"/"} component={Sigin} />
        )}
        <Route exact={true} path={"/signin"} component={Sigin} />
        <RestrictedRoute
          path={"/dashboard"}
          exact={true}
          component={ManagerHotel}
          isLoggedIn={isLoggedIn}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </ConnectedRouter>
  );
}

export default PublicRoutes;
