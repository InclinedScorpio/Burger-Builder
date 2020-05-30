import React, { Component } from "react";

//components
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary.js/OrderSummary";

const price = {
	Salad: 2,
	Bacon: 5,
	Cheese: 3,
	Meat: 7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			Salad: 0,
			Bacon: 0,
			Cheese: 0,
			Meat: 0
		},
		totalPrice: 12,
		ingredientsChoosen: 0,
		paying: false
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

	render() {
		return (
			<Auxiliary>
				<Modal show={this.state.paying} closeModal={this.cancelPaymentHandler}>
					<OrderSummary
						ingredients={this.state.ingredients}
						totalPrice={this.state.totalPrice}
					/>
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
		);
	}
}

export default BurgerBuilder;
