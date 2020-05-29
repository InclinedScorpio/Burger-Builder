import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
class BurgerBuilder extends Component {
	state = {
		ingredients: {
			Salad: 0,
			Bacon: 0,
			Cheese: 0,
			Meat: 0
		}
	};

	render() {
		return (
			<Auxiliary>
				<Burger ingredients={this.state.ingredients} />
				<div>Ingredients Control</div>
			</Auxiliary>
		);
	}
}

export default BurgerBuilder;
