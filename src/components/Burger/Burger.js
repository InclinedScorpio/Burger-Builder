import React from "react";
import Auxiliary from "../../hoc/Auxiliary";

//style
import styleB from "./Burger.module.css";
//components
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const Burger = props => {
	return (
		<div className={styleB.Burger}>
			<BurgerIngredients type="BreadTop" />
			<BurgerIngredients type="Cheese" />
			<BurgerIngredients type="Meat" />
			<BurgerIngredients type="BreadBottom" />
		</div>
	);
};

export default Burger;
