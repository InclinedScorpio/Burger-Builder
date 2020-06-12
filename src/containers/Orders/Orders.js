import React, { Component } from "react";
import axios from "../../axiosOrders";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";

class Orders extends Component {
	render() {
		console.log("Props welcomed:::", this.props);
		return (
			<div>
				{this.props.orders.length ? (
					this.props.orders.map(myorder => {
						return <Order key={myorder.id} order={myorder} />;
					})
				) : (
					<h2 style={{ fontWeight: "300", textAlign: "center" }}>
						No orders currently
					</h2>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders
	};
};

export default connect(mapStateToProps)(Orders);
