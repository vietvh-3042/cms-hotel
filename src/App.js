import { ConfigProvider } from "antd";
import "./assets/scss/index.scss";
import vi_VN from "antd/es/locale/vi_VN";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer, Slide } from "react-toastify";
import { PersistGate } from "redux-persist/lib/integration/react";
import { history, persistor, store } from "./redux/store";
import Routes from "./routers";

function App() {
	return (
		<ConfigProvider locale={vi_VN}>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<Routes history={history} />
				</PersistGate>
			</Provider>
			<ToastContainer
				position="top-right"
				transition={Slide}
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
			/>
		</ConfigProvider>
	);
}

export default App;
