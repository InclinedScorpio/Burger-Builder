import React from "react";

import styleOrder from "./Order.module.css";

const Order = props => {
	let ingredients = [];

	for (let key in props.order.order.ingredients) {
		// console.log("Key", key, "Value", props.order.order.ingredients[key]);
		ingredients.push({
			key: key,
			amount: props.order.order.ingredients[key]
		});
	}
	console.log("EEEEE", ingredients);
	return (
		<div className={styleOrder.Order}>
			<strong>INGREDIENTS:</strong>

			{ingredients &&
				ingredients.map(ig => {
					return (
						<p>
							{" "}
							{ig.key} : {ig.amount}
						</p>
					);
				})}
			<div>
				PRICE :{" "}
				<strong>
					{Number.parseFloat(props.order.order.totalPrice).toFixed(2)}$
				</strong>
			</div>
		</div>
	);
};

export default Order;
