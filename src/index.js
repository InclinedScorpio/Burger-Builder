import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import AuthReducer from "./store/reducers/auth";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const composeEnhancers =
	(process.env.NODE_ENV === "development"
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null) || compose;

const rootReducers = combineReducers({
	burger: burgerBuilderReducer,
	auth: AuthReducer
});

const store = createStore(
	rootReducers,
	composeEnhancers(applyMiddleware(thunk))
);

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
