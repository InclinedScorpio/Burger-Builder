import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../store/actions/index";
import axios from "../../axiosOrders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary.js/OrderSummary";
import Loader from "../../components/UI/Loader/Loader";

class BurgerBuilder extends Component {
	state = {
		paying: false,
		isLoading: false
	};

	componentDidMount = () => {
		if (!this.props.ingredients) this.props.initIngredients();

		// if (this.props.ingredients == null) {
		// 	axiosInstance
		// 		.get("https://tech-burger.firebaseio.com/ingredients.json")
		// 		.then(res => {
		// 			this.props.initIngredients(res.data);
		// 		})
		// 		.catch(err => {
		// 			this.setState({
		// 				isError: true,
		// 				errorMessage: err.message
		// 			});
		// 		});
		// }
	};

	startPaymentHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({
				paying: true
			});
		} else {
			this.props.onburgerBuildingStarted();
			this.props.history.push("/auth?signup=false");
		}
	};

	cancelPaymentHandler = () => {
		this.setState({
			paying: false
		});
	};

	isCheckoutAvailable = ingredients => {
		let count = Object.keys(ingredients)
			.map(ig => {
				return ingredients[ig];
			})
			.reduce((acc, igCount) => {
				return acc + igCount;
			}, 0);

		return count > 0;
	};

	completePaymentHandler = () => {
		this.props.history.push({
			pathname: "/checkout"
			// search: new URLSearchParams(ingredients).toString()
		});
	};

	render() {
		return this.props.ingredients ? (
			<Auxiliary>
				<Modal show={this.state.paying} closeModal={this.cancelPaymentHandler}>
					{this.state.isLoading ? (
						<Loader />
					) : (
						<OrderSummary
							ingredients={this.props.ingredients}
							totalPrice={this.props.totalPrice}
							paymentCancelled={this.cancelPaymentHandler}
							completePayment={this.completePaymentHandler}
						/>
					)}
				</Modal>

				<Burger ingredients={this.props.ingredients} />
				<BuildControls
					addIngredient={type => this.props.add_ingredients(type)}
					removeIngredient={type => this.props.remove_ingredients(type)}
					isIGDisabled={this.props.ingredients}
					isCheckoutAvailable={this.isCheckoutAvailable(this.props.ingredients)}
					priceToPay={this.props.totalPrice}
					paymentStarted={this.startPaymentHandler}
					isAuthenticated={this.props.isAuthenticated}
				/>
			</Auxiliary>
		) : this.props.isError ? (
			<p style={{ fontWeight: "700", textAlign: "center" }}>
				{this.props.errorMessage}
			</p>
		) : (
			<Loader />
		);
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.burger.ingredients,
		totalPrice: state.burger.totalPrice,
		isError: state.burger.isError,
		errorMessage: state.burger.errorMessage,
		isAuthenticated: state.auth.token ? true : false
	};
};

const mapDispatchToProps = dispatch => {
	return {
		add_ingredients: ingredient =>
			dispatch(actionCreator.addIngredient(ingredient)),
		remove_ingredients: ingredient =>
			dispatch(actionCreator.removeIngredient(ingredient)),
		initIngredients: () => dispatch(actionCreator.initIngredients()),
		onburgerBuildingStarted: () =>
			dispatch(actionCreator.burgerBuildingStarted())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
