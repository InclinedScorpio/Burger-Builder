import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";

const OrderSummary = props => {
	let igChoosen = Object.keys(props.ingredients).map((ig, index) => {
		return (
			<li key={ig + index}>
				{ig} : {props.ingredients[ig]}
			</li>
		);
	});

	return (
		<Auxiliary>
			<h2>Order Summary</h2>
			<h3>Order Includes :</h3>
			{igChoosen}
			<p>
				Total : <strong>{props.totalPrice}$</strong> <i>(Tax Included)</i>
			</p>
		</Auxiliary>
	);
};
export default OrderSummary;
