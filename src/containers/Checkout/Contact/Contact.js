import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Loader/Loader";
import axios from "../../../axiosOrders";
import styleContact from "./Contact.module.css";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

class Contact extends Component {
	state = {
		formData: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Mention Full Name",
					name: "name"
				},
				value: "",
				constraints: {
					required: true,
					min: 3,
					max: 90
				},
				isValid: true,
				isTouched: false,
				errorMessage: null
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "jacob_1@gmail.com"
				},
				value: "",
				constraints: {
					required: true,
					format: "email",
					min: 3,
					max: 70
				},
				isValid: true,
				isTouched: false,
				errorMessage: null
			},
			address: {
				elementType: "textarea",
				elementConfig: {
					name: "address",
					placeholder: "Complete Address"
				},
				value: "",
				constraints: {
					required: true,
					min: 5,
					max: 200
				},
				isValid: true,
				isTouched: false,

				errorMessage: null
			},
			delivery_method: {
				elementType: "select",
				elementConfig: {
					options: [
						{
							value: "cheapest",
							label: "Cheapest"
						},
						{
							value: "fastest",
							label: "Fastest"
						}
					]
				},
				constraints: {
					in: ["cheapest"]
				},
				isValid: true,
				isTouched: true,
				errorMessage: null,
				value: "cheapest"
			}
		},
		isLoading: false,
		isError: false,
		errorMessage: ""
	};

	axiosOrderDeliveryHandler = postData => {
		let queryParam = "/orders.json?auth=" + this.props.token;

		axios
			.post(queryParam, { ...postData })
			.then(_ => {
				this.setState({
					isLoading: false,
					isError: false,
					errorMessage: ""
				});
				this.props.resetBurgerBuilder();
			})
			.catch(err => {
				this.setState({
					isLoading: false,
					isError: true,
					errorMessage: err.response
				});
			});
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
			totalPrice: this.props.totalPrice,
			name: this.state.formData.name.value,
			email: this.state.formData.email.value,
			address: this.state.formData.address.value,
			deliveryMethod: this.state.formData.delivery_method.value,
			userId: this.props.userId
		};
		this.axiosOrderDeliveryHandler(order);
	};

	validationHandler = (value, constraints) => {
		if (constraints.required) {
			if (value.trim() == "") {
				return { result: false, message: "Field can't be empty!" };
			}
		}
		if (constraints.max) {
			if (value.trim().length > constraints.max) {
				return {
					result: false,
					message: `Can't use more than ${constraints.max} characters.`
				};
			}
		}
		if (constraints.min) {
			if (value.trim().length < constraints.min) {
				return {
					result: false,
					message: `There must be atleast ${constraints.min} characters.`
				};
			}
		}
		if (constraints.in) {
			if (!constraints.in.includes(value)) {
				return {
					result: false,
					message: `We are not supporting ${value} currently.`
				};
			}
		}
		if (constraints.format) {
			let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if (!reg.test(value)) {
				return {
					result: false,
					message: `That doesn't seems like an email.`
				};
			}
		}
		return {
			result: true
		};
	};

	inputChangeHandler = (event, inputType) => {
		let updatedForm = { ...this.state.formData };
		let inputTargetted = { ...updatedForm[inputType] };
		inputTargetted.value = event.target.value;

		updatedForm[inputType] = inputTargetted;
		updatedForm[inputType].isTouched = true;

		let isValid = this.validationHandler(
			event.target.value,
			inputTargetted.constraints
		);

		if (isValid.result == false) {
			updatedForm[inputType].errorMessage = isValid.message;
		} else {
			updatedForm[inputType].errorMessage = null;
		}
		updatedForm[inputType].isValid = isValid.result;

		this.setState({
			formData: updatedForm
		});
	};

	render() {
		let isSubmissionActive = true;
		let inputElements = [];
		for (let key in this.state.formData) {
			inputElements.push({
				id: key,
				config: this.state.formData[key],
				isValid: this.state.formData[key].isValid,
				errorMessage: this.state.formData[key].errorMessage
			});
			isSubmissionActive =
				isSubmissionActive &&
				this.state.formData[key].isTouched &&
				this.state.formData[key].isValid;
		}

		let redirectToBurgerBuilder = "";
		if (this.props.purchased) {
			redirectToBurgerBuilder = <Redirect to="/" />;
		}

		return (
			<div className={styleContact.Contact}>
				{redirectToBurgerBuilder}

				<form onSubmit={this.placeOrderHandle}>
					<h2>
						{this.state.isError
							? this.state.errorMessage
							: "Please fill Contact Details"}
					</h2>

					{this.state.isLoading ? (
						<Spinner />
					) : (
						<div>
							{inputElements &&
								inputElements.map(el => (
									<Input
										isValid={el.isValid}
										key={el.id}
										elementType={el.config.elementType}
										config={el.config.elementConfig}
										inputChanged={event => {
											this.inputChangeHandler(event, el.id);
										}}
										errorMessage={el.errorMessage}
									/>
								))}
							<div>
								<Button btnType="Success" disabled={!isSubmissionActive}>
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

const mapStateToProps = state => {
	return {
		ingredients: state.burger.ingredients,
		token: state.auth.token,
		userId: state.auth.userId
	};
};

const mapDispatchToProps = dispatch => {
	return {
		resetBurgerBuilder: () => dispatch(actions.resetBurgerBuilder())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Contact, axios));
