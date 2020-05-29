import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";

class BurgerBuilder extends Component {
	state = {};

	render() {
		return (
			<Auxiliary>
				<div>Burger Ingredients</div>
				<div>Ingredients Control</div>
			</Auxiliary>
		);
	}
}

export default BurgerBuilder;
