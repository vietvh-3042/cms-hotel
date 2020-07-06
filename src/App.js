import { ConfigProvider } from "antd";
import "antd/dist/antd.css";
import "./assets/index.scss";
import vi_VN from "antd/es/locale/vi_VN";
import React from "react";
import { Provider } from "react-redux";
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
    </ConfigProvider>
  );
}

export default App;
