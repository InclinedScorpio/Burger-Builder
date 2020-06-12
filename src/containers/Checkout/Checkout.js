import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Spinner from "../../components/UI/Loader/Loader";
import Contact from "./Contact/Contact";

class Checkout extends Component {
	state = {
		successBtnVisible: true
	};

	componentDidMount() {
		// let query = new URLSearchParams(this.props.location.search);
		// let ingredients = {};
		// let totalPrice = 0;
		// query.forEach((value, key) => {
		// 	if (key == "totalPrice") {
		// 		totalPrice = parseInt(value);
		// 	} else {
		// 		ingredients[key] = parseInt(value);
		// 	}
		// });
		// this.setState({
		// 	ingredients: { ...ingredients },
		// 	totalPrice: totalPrice,
		// 	successBtnVisible:
		// 		this.props.location.pathname == "/checkout" ? true : false
		// });
	}

	backClickHandler = () => {
		this.props.history.replace("/");
	};

	proceedClickHandler = () => {
		this.setState({
			successBtnVisible: false
		});
		this.props.history.push({
			pathname: "/checkout/contact"
		});
	};

	render() {
		console.log("State::", this.state);
		return (
			<div>
				{this.props.ingredients ? (
					<CheckoutSummary
						ingredients={this.props.ingredients}
						backClicked={this.backClickHandler}
						proceedClicked={this.proceedClickHandler}
						successBtnVisible={this.state.successBtnVisible}
					/>
				) : (
					<Redirect to="/" />
				)}
				<div style={{ textAlign: "center", width: "100%" }}>
					<Route
						path={this.props.match.url + "/contact"}
						render={() => (
							<Contact
								ingredients={this.props.ingredients}
								totalPrice={this.props.totalPrice}
							/>
						)}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.burger.ingredients,
		totalPrice: state.burger.totalPrice
	};
};

export default connect(mapStateToProps)(Checkout);
