import Home from "@Containers/pages/Home";
import ManagerBill from "@Containers/ManagerBill";
import ManagerBusinessResult from "@Containers/ManagerBusinessResult";
import ManagerCheckMoney from "@Containers/ManagerCheckMoney";
import ManagerHotel from "@Containers/ManagerHotel";
import ManagerHotelDiary from "@Containers/ManagerHotelDiary";
import ManagerHotelFloor from "@Containers/ManagerHotelFloor";
import ManagerListRoom from "@Containers/ManagerListRoom";
import ManagerMapHotel from "@Containers/ManagerMapHotel";
import ManagerPayment from "@Containers/ManagerPayment";
import ManagerPriceTime from "@Containers/ManagerPriceTime";
import ManagerReceipts from "@Containers/ManagerReceipts";
import ManagerRecentRevenue from "@Containers/ManagerRecentRevenue";
import ManagerRevenue from "@Containers/ManagerRevenue";
import ManagerRoomSale from "@Containers/ManagerRoomSale";
import ManagerSamplePrice from "@Containers/ManagerSamplePrice";
import ManagerService from "@Containers/ManagerService";
import ManagerWarehousing from "@Containers/ManagerService/components/ManagerWarehousing";
import ManagerStatisticalService from "@Containers/ManagerStatisticalService";
import NotFound from "@Containers/pages/NotFound";
import Sigin from "@Containers/pages/Signin";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

function PublicRoutes(props) {
	const { history } = props;
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
					<Route exact={true} path={"/"} component={Home} />
				)}
				<Route path={"/signin"} component={Sigin} />

				<PrivateRoute
					path={"/dashboard"}
					exact={true}
					component={ManagerMapHotel}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/list-hotel"}
					component={ManagerHotel}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/hotel-floor"}
					component={ManagerHotelFloor}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/hotel-diary"}
					component={ManagerHotelDiary}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/list-room"}
					component={ManagerListRoom}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/sample-price"}
					component={ManagerSamplePrice}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/price-time"}
					component={ManagerPriceTime}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/list-service"}
					exact={true}
					component={ManagerService}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/list-service/warehousing/:id"}
					component={ManagerWarehousing}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/statistical-service"}
					component={ManagerStatisticalService}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/receipts"}
					component={ManagerReceipts}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/payment"}
					component={ManagerPayment}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/revenue"}
					component={ManagerRevenue}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/room-sales"}
					component={ManagerRoomSale}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/recent-revenue"}
					component={ManagerRecentRevenue}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/list-bill"}
					component={ManagerBill}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/check-money"}
					component={ManagerCheckMoney}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/business-result"}
					component={ManagerBusinessResult}
					isLoggedIn={isLoggedIn}
				/>
				<Route path="*" component={NotFound} />
			</Switch>
		</ConnectedRouter>
	);
}

export default PublicRoutes;
