import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Signout from "./containers/Auth/Signout/Signout";
import { compose } from "@material-ui/system";

class App extends Component {
	componentDidMount = () => {
		this.props.checkAutoLoginStatus();
	};

	render() {
		let routes = null;
		console.log("Redirected:::", this.props.isAuthenticated);
		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/checkout" component={Checkout} />
					<Route path="/order" component={Orders} />
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
