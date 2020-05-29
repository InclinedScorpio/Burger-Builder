import React from "react";
import styleBC from "./BuildControl.module.css";

const BuildControl = props => {
	return (
		<div className={styleBC.BuildControl}>
			<div className={styleBC.Label}> {props.label}</div>
			<button className={styleBC.More} onClick={props.ingredientAdded}>
				More
			</button>
			<button
				className={styleBC.Less}
				onClick={props.removeIngredient}
				disabled={!props.isIGDisabled[props.label]}
			>
				Less
			</button>
		</div>
	);
};

export default BuildControl;
