import React, { Component } from "react";
import axios from "../../axiosOrders";

import Order from "../../components/Order/Order";

class Orders extends Component {
	state = {
		orders: []
	};

	componentDidMount() {
		axios
			.get("/orders.json")
			.then(res => {
				let resultArr = [];
				for (let key in res.data) {
					resultArr.push({ ...res.data[key], id: key });
				}
				console.log("Stateis()()(", resultArr);

				this.setState({
					orders: resultArr
				});
			})
			.catch(err => {
				console.log("Got Error", err);
			});
	}

	render() {
		return (
			<div>
				{this.state.orders.length &&
					this.state.orders.map(myorder => {
						return <Order key={myorder.id} order={myorder} />;
					})}
			</div>
		);
	}
}

export default Orders;
