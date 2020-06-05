import React, { Component } from "react";

import Aux from "../Auxiliary/Auxiliary";
import Model from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			show: false,
			isError: false,
			errorMessage: ""
		};

		resInterceptor = null;
		reqInterceptor = null;

		componentDidMount() {
			this.reqInterceptor = axios.interceptors.request.use(config => {
				// this.setState({
				// 	isError: false
				// });
				return config;
			});

			this.resInterceptor = axios.interceptors.response.use(null, err => {
				this.setState({
					isError: true,
					errorMessage: err.message,
					show: true
				});
				return Promise.reject(err);
			});
		}

		componentWillUnmount = () => {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		};

		closeModal = () => {
			this.setState({
				show: false,
				isError: false
			});
		};

		render() {
			return (
				<Aux>
					<Model show={this.state.show} closeModal={this.closeModal}>
						{this.state.isError && this.state.errorMessage}
					</Model>
					<WrappedComponent {...this.props} />
				</Aux>
			);
		}
	};
};

export default withErrorHandler;
