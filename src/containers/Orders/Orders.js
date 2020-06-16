import React, { Component } from "react";
import axios from "../../axiosOrders";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Loader/Loader";

class Orders extends Component {
	state = {
		orders: [],
		isError: false,
		errorMessage: "",
		isLoading: false
	};

	componentDidMount = () => {
		this.setState({
			isLoading: true
		});
		let queryParam =
			"?auth=" +
			this.props.token +
			'&orderBy= "userId"' +
			'&equalTo="' +
			this.props.userId +
			'"';

		let ordersArray = [];

		axios
			.get("/orders.json" + queryParam)
			.then(res => {
				for (const key in res.data) {
					ordersArray.push({ ...res.data[key], id: key });
				}
				this.setState({
					orders: [...ordersArray],
					isLoading: false
				});
			})
			.catch(err => {
				this.setState({
					isError: true,
					errorMessage: err.response,
					isLoading: false
				});
			});
	};

	render() {
		if (this.state.isError) {
			return (
				<h2 style={{ fontWeight: "300", textAlign: "center" }}>
					{this.state.errorMessage}
				</h2>
			);
		}
		if (this.state.isLoading) {
			return <Spinner />;
		}
		return (
			<div>
				{this.state.orders.length ? (
					this.state.orders.map(myorder => {
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
		token: state.auth.token,
		userId: state.auth.userId
	};
};

export default connect(mapStateToProps)(Orders);
