import React from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

//style
import styleB from "./Burger.module.css";
//components
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const Burger = props => {
	console.log("Building:", props);

	let preparedBurger = Object.keys(props.ingredients)
		.map((ig, index) => {
			return [...Array(props.ingredients[ig])].map((_, i) => {
				return <BurgerIngredients type={ig} key={ig + i} />;
			});
		})
		.flat();
	if (preparedBurger.length === 0) {
		preparedBurger = <p>Please Add Ingredients</p>;
	}

	return (
		<div className={styleB.Burger}>
			<BurgerIngredients type="BreadTop" />
			{preparedBurger}
			<BurgerIngredients type="BreadBottom" />
		</div>
	);
};

export default Burger;
