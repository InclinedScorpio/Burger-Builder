import React from "react";

import styleOrder from "./Order.module.css";

const Order = props => {
	let ingredients = [];

	for (let key in props.order.ingredients) {
		ingredients.push({
			key: key,
			amount: props.order.ingredients[key]
		});
	}
	return (
		<div className={styleOrder.Order}>
			<strong>INGREDIENTS:</strong>

			{ingredients &&
				ingredients.map((ig, index) => {
					return (
						<p key={index}>
							{" "}
							{ig.key} : {ig.amount}
						</p>
					);
				})}
			<div>
				PRICE :{" "}
				<strong>{Number.parseFloat(props.order.totalPrice).toFixed(2)}$</strong>
			</div>
		</div>
	);
};

export default Order;
