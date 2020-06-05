import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Loader/Loader";
import axios from "../../../axiosOrders";
import styleContact from "./Contact.module.css";

class Contact extends Component {
	state = {
		name: "",
		email: "",
		address: "",
		isLoading: false,
		isPaying: false
	};

	placeOrderHandle = event => {
		event.preventDefault();
		this.setState({
			isLoading: true
		});
		const order = {
			ingredients: {
				Salad: this.props.ingredients.Salad,
				Bacon: this.props.ingredients.Bacon,
				Cheese: this.props.ingredients.Cheese,
				Meat: this.props.ingredients.Meat
			},
			totalPrice: this.props.totalPrice
		};

		axios
			.post("/orders.json", { order })
			.then(res => {
				this.setState({
					isLoading: false
				});
				this.props.history.replace("/");
			})
			.catch(err => {
				this.setState({
					isLoading: false
				});
				window.alert(err.message);
			});
	};

	render() {
		return (
			<div className={styleContact.Contact}>
				<form>
					{this.state.isLoading ? (
						<Spinner />
					) : (
						<div>
							<input type="text" name="name" placeholder="Name" />
							<input type="email" name="email" placeholder="Email" />
							<input type="text" name="address" placeholder="Your Address" />
							<div>
								<Button btnType="Success" clicked={this.placeOrderHandle}>
									Place Order
								</Button>
							</div>
						</div>
					)}
				</form>
			</div>
		);
	}
}

export default withRouter(Contact);
