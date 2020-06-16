import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Auth from "./containers/Auth/Auth";
import Signout from "./containers/Auth/Signout/Signout";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncOrders = asyncComponent(() => {
	return import("./containers/Orders/Orders");
});

const asynCheckout = asyncComponent(() => {
	return import("./containers/Checkout/Checkout");
});

class App extends Component {
	componentDidMount = () => {
		this.props.checkAutoLoginStatus();
	};

	render() {
		let routes = null;
		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/checkout" component={asynCheckout} />
					<Route path="/order" component={asyncOrders} />
					<Route path="/signout" component={Signout} />
					<Route path="/auth" component={Auth} />
					<Route path="/" exact component={BurgerBuilder} />
					<Redirect to="/" />
				</Switch>
			);
		} else {
			routes = (
				<Switch>
					<Route path="/auth" component={Auth} />
					<Route path="/" exact component={BurgerBuilder} />
					<Redirect to="/" />
				</Switch>
			);
		}

		return <Layout>{routes}</Layout>;
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token ? true : false
	};
};

const mapDispatchToProps = dispatch => {
	return {
		checkAutoLoginStatus: () => dispatch(actions.checkAutoLoginStatus())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
