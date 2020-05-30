import React from "react";

//components
import Auxiliary from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

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
				Total : <strong>{props.totalPrice.toFixed(2)}$</strong>{" "}
				<i>(Tax Included)</i>
			</p>
			<Button btnType="Success">Continue</Button>
			<Button btnType="Danger" clicked={props.paymentCancelled}>
				Cancel
			</Button>
		</Auxiliary>
	);
};
export default OrderSummary;
