import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Spinner from "../../components/UI/Loader/Loader";
import Contact from "./Contact/Contact";

class Checkout extends Component {
	state = {
		ingredients: null,
		successBtnVisible: true,
		totalPrice: null
	};

	componentDidMount() {
		let query = new URLSearchParams(this.props.location.search);
		let ingredients = {};
		let totalPrice = 0;
		query.forEach((value, key) => {
			if (key == "totalPrice") {
				totalPrice = parseInt(value);
			} else {
				ingredients[key] = parseInt(value);
			}
		});
		this.setState({
			ingredients: { ...ingredients },
			totalPrice: totalPrice,
			successBtnVisible:
				this.props.location.pathname == "/checkout" ? true : false
		});
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
				{this.state.ingredients ? (
					<CheckoutSummary
						ingredients={this.state.ingredients}
						backClicked={this.backClickHandler}
						proceedClicked={this.proceedClickHandler}
						successBtnVisible={this.state.successBtnVisible}
					/>
				) : (
					<Spinner />
				)}
				<div style={{ textAlign: "center", width: "100%" }}>
					<Route
						path={this.props.match.url + "/contact"}
						render={() => (
							<Contact
								ingredients={this.state.ingredients}
								totalPrice={this.state.totalPrice}
							/>
						)}
					/>
				</div>
			</div>
		);
	}
}

export default Checkout;
