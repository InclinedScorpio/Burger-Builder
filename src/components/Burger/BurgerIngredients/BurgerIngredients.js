import React from "react";
import PropTypes from "prop-types";

//style
import styleBI from "./BurgerIngredients.module.css";
//component
import Auxiliary from "../../../hoc/Auxiliary";

let BurgerIngredients = props => {
	let ingredients = null;

	switch (props.type) {
		case "BreadBottom":
			ingredients = <div className={styleBI.BreadBottom}></div>;
			break;
		case "BreadTop":
			ingredients = (
				<Auxiliary>
					<div className={styleBI.BreadTop}>
						<div className={styleBI.Seeds2}></div>
						<div className={styleBI.Seeds1}></div>
					</div>
				</Auxiliary>
			);
			break;
		case "Meat":
			ingredients = <div className={styleBI.Meat}></div>;
			break;
		case "Cheese":
			ingredients = <div className={styleBI.Cheese}></div>;
			break;
		case "Bacon":
			ingredients = <div className={styleBI.Bacon}></div>;
			break;
		case "Salad":
			ingredients = <div className={styleBI.Salad}></div>;
			break;
	}

	return ingredients;
};

BurgerIngredients.propTypes = {
	type: PropTypes.string.isRequired
};

export default BurgerIngredients;
