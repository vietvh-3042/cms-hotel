import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import rootSaga from "./sagas";

const persistConfig = {
	key: "Hotel Plaftform",
	storage,
	whitelist: ["App", "Auth"],
};

const loggerMiddleware = createLogger({
	predicate: () =>
		process.env.NODE_ENV === "development" && typeof window !== "undefined",
});

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const routeMiddleware = routerMiddleware(history);

const middlewares = [sagaMiddleware, routeMiddleware, loggerMiddleware];

const allReducer = combineReducers({
	...reducers,
	router: connectRouter(history),
});

const persistedReducer = persistReducer(persistConfig, allReducer);

const store = createStore(
	persistedReducer,
	composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, history };
