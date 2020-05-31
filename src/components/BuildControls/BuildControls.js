import React from "react";

//style
import styleBC from "./BuildControls.module.css";
//components
import BuildControl from "./BuildControl/BuildControl";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

const ingredients = ["Cheese", "Meat", "Bacon", "Salad"];

const BuildControls = props => {
	return (
		<div className={styleBC.BuildControls}>
			{ingredients.map(ig => {
				return (
					<BuildControl
						label={ig}
						key={ig}
						ingredientAdded={() => {
							props.addIngredient(ig);
						}}
						removeIngredient={() => {
							props.removeIngredient(ig);
						}}
						isIGDisabled={props.isIGDisabled}
					/>
				);
			})}

			<button
				className={styleBC.OrderButton}
				disabled={!props.isCheckoutAvailable}
				onClick={props.paymentStarted}
			>
				{props.isCheckoutAvailable ? (
					<span>Pay {props.priceToPay.toFixed(2)}$</span>
				) : (
					"Add Ingredient to Checkout"
				)}
			</button>
		</div>
	);
};

export default BuildControls;
