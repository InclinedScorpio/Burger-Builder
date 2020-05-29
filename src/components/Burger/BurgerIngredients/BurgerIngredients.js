import React from "react";

//style
import styleBI from "./BurgerIngredients.module.css";
//component
import Auxiliary from "../../../hoc/Auxiliary";

const burgerIngredients = props => {
	let ingredients = null;

	switch (props.type) {
		case props.type == "BreadBottom":
			ingredients = <div className={styleBI.BreadBottom}></div>;
			break;
		case props.type == "BreadTop":
			ingredients = (
				<Auxiliary>
					<div className={styleBI.Seeds2}></div>
					<div className={styleBI.Seeds1}></div>
					<div className={styleBI.BreadTop}></div>
				</Auxiliary>
			);
			break;
		case props.type == "Meat":
			ingredients = <div className={styleBI.Meat}></div>;
			break;
		case (props.type = "Cheese"):
			ingredients = <div className={styleBI.Cheese}></div>;
			break;
		case (props.type = "Bacon"):
			ingredients = <div className={styleBI.Bacon}></div>;
			break;
		case (props.type = "Salad"):
			ingredients = <div className={styleBI.Salad}></div>;
			break;
	}

	return <Auxiliary>{ingredients}</Auxiliary>;
};

export default burgerIngredients;
