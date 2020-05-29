import React, { Component } from "react";

//components
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			Salad: 0,
			Bacon: 0,
			Cheese: 0,
			Meat: 0
		},
		price: {
			Salad: 10,
			Bacon: 22,
			Cheese: 15,
			Meat: 30
		},
		totalPrice: 12
	};

	addIngredientsHandler = type => {
		let currentCount = this.state.ingredients[type];
		let newIngredientsObj = { ...this.state.ingredients };
		newIngredientsObj[type] = currentCount + 1;

		let totalPrice = this.state.totalPrice + this.state.price[type];

		this.setState({
			ingredients: newIngredientsObj,
			totalPrice: totalPrice
		});
	};

	removeIngredientsHandler = type => {
		let currentCount = this.state.ingredients[type];
		if (currentCount == 0) {
			return null;
		}
		let newIngredientsObj = { ...this.state.ingredients };
		newIngredientsObj[type] = currentCount - 1;

		let totalPrice = this.state.totalPrice - this.state.price[type];

		this.setState({
			ingredients: newIngredientsObj,
			totalPrice: totalPrice
		});
	};

	render() {
		return (
			<Auxiliary>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					addIngredient={this.addIngredientsHandler}
					removeIngredient={this.removeIngredientsHandler}
					isIGDisabled={this.state.ingredients}
				/>
			</Auxiliary>
		);
	}
}

export default BurgerBuilder;
