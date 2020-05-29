import React from "react";

//style
import styleBC from "./BuildControls.module.css";
//components
import BuildControl from "./BuildControl/BuildControl";

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
		</div>
	);
};

export default BuildControls;
