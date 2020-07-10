import ManagerHotel from "@Containers/ManagerHotel";
import ManagerHotelDiary from "@Containers/ManagerHotelDiary";
import ManagerHotelFloor from "@Containers/ManagerHotelFloor";
import ManagerListRoom from "@Containers/ManagerListRoom";
import ManagerMapHotel from "@Containers/ManagerMapHotel";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import NotFound from "../containers/pages/NotFound";
import Sigin from "../containers/pages/Signin";
import PrivateRoute from "./PrivateRoute";

function PublicRoutes(props) {
  const { history } = props;
  console.log(history);
  const isLoggedIn = useSelector((state) => state.Auth.loggedIn);
  return (
    <ConnectedRouter history={history}>
      <Switch>
        {isLoggedIn ? (
          <PrivateRoute
            path={"/"}
            exact={true}
            component={ManagerMapHotel}
            isLoggedIn={isLoggedIn}
          />
        ) : (
          <Route exact={true} path={"/"} component={Sigin} />
        )}
        <Route exact={true} path={"/signin"} component={Sigin} />
        <PrivateRoute
          path={"/dashboard"}
          exact={true}
          component={ManagerMapHotel}
          isLoggedIn={isLoggedIn}
        />
        <PrivateRoute
          path={"/dashboard/list-hotel"}
          exact={true}
          component={ManagerHotel}
          isLoggedIn={isLoggedIn}
        />
        <PrivateRoute
          path={"/dashboard/hotel-floor"}
          exact={true}
          component={ManagerHotelFloor}
          isLoggedIn={isLoggedIn}
        />
        <PrivateRoute
          path={"/dashboard/hotel-diary"}
          exact={true}
          component={ManagerHotelDiary}
          isLoggedIn={isLoggedIn}
        />
        <PrivateRoute
          path={"/dashboard/list-room"}
          exact={true}
          component={ManagerListRoom}
          isLoggedIn={isLoggedIn}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </ConnectedRouter>
  );
}

export default PublicRoutes;
