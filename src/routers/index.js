import { ConnectedRouter } from "connected-react-router";
import ManagerBill from "containers/ManagerBill";
import ManagerBusinessResult from "containers/ManagerBusinessResult";
import ManagerCheckMoney from "containers/ManagerCheckMoney";
import ManagerHotel from "containers/ManagerHotel";
import ManagerHotelDiary from "containers/ManagerHotelDiary";
import ManagerHotelFloor from "containers/ManagerHotelFloor";
import ManagerListRoom from "containers/ManagerListRoom";
import ManagerMapHotel from "containers/ManagerMapHotel";
import ManagerPayment from "containers/ManagerPayment";
import ManagerPriceTime from "containers/ManagerPriceTime";
import ManagerReceipts from "containers/ManagerReceipts";
import ManagerRecentRevenue from "containers/ManagerRecentRevenue";
import ManagerRevenue from "containers/ManagerRevenue";
import ManagerRoomSale from "containers/ManagerRoomSale";
import ManagerSamplePrice from "containers/ManagerSamplePrice";
import ManagerService from "containers/ManagerService";
import ManagerWarehousing from "containers/ManagerService/components/ManagerWarehousing";
import ManagerStatisticalService from "containers/ManagerStatisticalService";
import Home from "containers/pages/Home";
import NotFound from "containers/pages/NotFound";
import Signin from "containers/pages/Signin";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Cookies from "universal-cookie";
import ManagerCategory from "containers/ManagerCategory";
import ManagerTypeCategory from "containers/ManagerTypeCategory";
import ManagerPaymentMethod from "containers/ManagerPaymentMethod";
import ManagerGroup from "containers/ManagerGroup";
import ManagerEmployee from "containers/ManagerEmployee";
import ManagerCustomer from "containers/ManagerCustomer";
import ManagerClassify from "containers/ManagerClassify";

const cookies = new Cookies();

let tenantName = cookies.get("tenant-name");

function PublicRoutes(props) {
	const { history, cookies } = props;
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
				<Route path={"/signin"} component={Signin} />

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
					path={"/dashboard/type-category"}
					exact={true}
					component={ManagerTypeCategory}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/list-category"}
					exact={true}
					component={ManagerCategory}
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
					path={"/dashboard/paymentMethod"}
					component={ManagerPaymentMethod}
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

				<PrivateRoute
					path={"/dashboard/list-customer"}
					component={ManagerCustomer}
					isLoggedIn={isLoggedIn}
				/>

				<PrivateRoute
					path={"/dashboard/group"}
					component={ManagerGroup}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/employee"}
					component={ManagerEmployee}
					isLoggedIn={isLoggedIn}
				/>
				<PrivateRoute
					path={"/dashboard/classify"}
					component={ManagerClassify}
					isLoggedIn={isLoggedIn}
				/>
				<Route path="*" component={NotFound} />
			</Switch>
		</ConnectedRouter>
	);
}

export default PublicRoutes;
