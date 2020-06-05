import React, { Component } from "react";
import axios from "../../axiosOrders";
import axiosInstance from "axios";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary.js/OrderSummary";
import Loader from "../../components/UI/Loader/Loader";

const price = {
	Salad: 2.3,
	Bacon: 5.2,
	Cheese: 3.2,
	Meat: 7.6
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 12,
		ingredientsChoosen: 0,
		paying: false,
		isLoading: false,
		isError: false,
		errorMessage: ""
	};

	componentDidMount = () => {
		axiosInstance
			.get("https://tech-burger.firebaseio.com/ingredients.json")
			.then(res => {
				this.setState({
					ingredients: res.data
				});
			})
			.catch(err => {
				this.setState({
					isError: true,
					errorMessage: err.message
				});
			});
	};

	addIngredientsHandler = type => {
		let currentCount = this.state.ingredients[type];
		let ingredientsChoosen = this.state.ingredientsChoosen + 1;
		let newIngredientsObj = { ...this.state.ingredients };
		newIngredientsObj[type] = currentCount + 1;

		let totalPrice = this.state.totalPrice + price[type];

		this.setState({
			ingredients: newIngredientsObj,
			totalPrice: totalPrice,
			ingredientsChoosen: ingredientsChoosen
		});
	};

	removeIngredientsHandler = type => {
		let currentCount = this.state.ingredients[type];
		let ingredientsChoosen = this.state.ingredientsChoosen - 1;
		if (currentCount == 0) {
			return null;
		}
		let newIngredientsObj = { ...this.state.ingredients };
		newIngredientsObj[type] = currentCount - 1;

		let totalPrice = this.state.totalPrice - price[type];

		this.setState({
			ingredients: newIngredientsObj,
			totalPrice: totalPrice,
			ingredientsChoosen: ingredientsChoosen
		});
	};

	startPaymentHandler = () => {
		this.setState({
			paying: true
		});
	};

	cancelPaymentHandler = () => {
		this.setState({
			paying: false
		});
	};

	completePaymentHandler = () => {
		let ingredients = {
			...this.state.ingredients,
			totalPrice: this.state.totalPrice
		};
		this.props.history.push({
			pathname: "/checkout",
			search: new URLSearchParams(ingredients).toString()
		});
	};

	render() {
		console.log("MyState%", this.state);
		return this.state.ingredients ? (
			<Auxiliary>
				<Modal show={this.state.paying} closeModal={this.cancelPaymentHandler}>
					{this.state.isLoading ? (
						<Loader />
					) : (
						<OrderSummary
							ingredients={this.state.ingredients}
							totalPrice={this.state.totalPrice}
							paymentCancelled={this.cancelPaymentHandler}
							completePayment={this.completePaymentHandler}
						/>
					)}
				</Modal>

				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					addIngredient={this.addIngredientsHandler}
					removeIngredient={this.removeIngredientsHandler}
					isIGDisabled={this.state.ingredients}
					isCheckoutAvailable={this.state.ingredientsChoosen}
					priceToPay={this.state.totalPrice}
					paymentStarted={this.startPaymentHandler}
				/>
			</Auxiliary>
		) : this.state.isError ? (
			<p style={{ fontWeight: "700", textAlign: "center" }}>
				{this.state.errorMessage}
			</p>
		) : (
			<Loader />
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
