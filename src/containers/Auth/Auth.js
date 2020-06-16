import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { validationHandler } from "../../shared/utilities";

import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Loader/Loader";
import Input from "../../components/UI/Input/Input";
import Toast from "../../components/UI/Toast/DynamicToast/DynamicToast";
import * as action from "../../store/actions/index";
import styleAuth from "./Auth.module.css";

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your E-mail ID",
					name: "email"
				},
				value: "",
				constraints: {
					required: true,
					format: "email"
				},
				isValid: true,
				isTouched: false,
				errorMessage: null
			},
			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Enter password here",
					name: "password"
				},
				value: "",
				constraints: {
					requiredNoTrim: true,
					minNoTrim: 6,
					maxNoTrim: 60
				},
				isValid: true,
				isTouched: false,
				errorMessage: null
			}
		},
		isSignup: true
	};

	componentDidMount = () => {
		let query = new URLSearchParams(this.props.location.search);

		query.forEach((value, key) => {
			if (key == "signup" && value == "false") {
				this.authStatusChangeHandler();
			}
		});
	};

	inputChangeHandler = (event, inputType) => {
		let updatedForm = { ...this.state.controls };
		let inputTargetted = { ...updatedForm[inputType] };
		inputTargetted.value = event.target.value;

		updatedForm[inputType] = inputTargetted;
		updatedForm[inputType].isTouched = true;

		let isValid = validationHandler(
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
			controls: updatedForm
		});
	};

	submitFormHandler = event => {
		event.preventDefault();
		let submissionData = {
			email: this.state.controls.email.value,
			password: this.state.controls.password.value,
			returnSecureToken: true
		};
		this.props.onAuthCheck(submissionData, this.state.isSignup);
	};

	authStatusChangeHandler = () => {
		let controls = { ...this.state.controls };

		for (const key in controls) {
			if (controls[key].value == "") controls[key].isTouched = false;
		}

		this.setState(prevState => {
			return {
				isSignup: !prevState.isSignup,
				controls: controls
			};
		});
	};

	render() {
		let isSubmissionActive = true;
		let inputElements = [];
		for (let key in this.state.controls) {
			inputElements.push({
				id: key,
				config: this.state.controls[key],
				isValid: this.state.controls[key].isValid,
				errorMessage: this.state.controls[key].errorMessage,
				value: this.state.controls[key].value
			});
			isSubmissionActive =
				isSubmissionActive &&
				this.state.controls[key].isTouched &&
				this.state.controls[key].isValid;
		}

		let redirectAvailable = null;
		if (this.props.isAuthenticated) {
			if (this.props.isBurgeBuildingStarted) {
				redirectAvailable = <Redirect to="/checkout" />;
			} else {
				redirectAvailable = <Redirect to="/" />;
			}
		}

		return (
			<div className={styleAuth.Auth}>
				{redirectAvailable}
				<form onSubmit={this.submitFormHandler} className={styleAuth.Form}>
					<h1>{this.state.isSignup ? "Sign-up" : "Sign-in"}</h1>

					<h5>Tech Burger Shop</h5>

					{this.props.isLoading ? (
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
										valueReceived={el.value}
										errorMessage={el.errorMessage}
									/>
								))}
							<div>
								<Button btnType="Success" disabled={!isSubmissionActive}>
									Submit
								</Button>
							</div>
						</div>
					)}
					<h4
						onClick={this.authStatusChangeHandler}
						style={{ cursor: "pointer" }}
					>
						Would like to {this.state.isSignup ? "Sign-in" : "Sign-up"} ?
					</h4>
				</form>
				{this.props.isError && (
					<Toast
						config={{
							type: "error",
							message: this.props.errorMessage,
							time: 4000
						}}
						hideToast={this.props.onRemoveErrors}
					/>
				)}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuthCheck: (data, isSignup) => dispatch(action.authCheck(data, isSignup)),
		onRemoveErrors: () => dispatch(action.removeError())
	};
};

const mapStateToProps = state => {
	return {
		isLoading: state.auth.loading,
		isError: state.auth.isError,
		errorMessage: state.auth.errorMessage,
		isAuthenticated: state.auth.token ? true : false,
		isBurgeBuildingStarted: state.burger.burgerBuildingStarted
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
