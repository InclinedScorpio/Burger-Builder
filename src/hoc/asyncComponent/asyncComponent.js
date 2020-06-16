import React, { Component } from "react";

const asyncComponent = importComponent => {
	return class extends Component {
		state = {
			comp: null
		};

		componentDidMount = () => {
			importComponent().then(cmp => {
				this.setState({
					comp: cmp.default
				});
			});
		};
		render() {
			let C = this.state.comp;
			return C ? <C {...this.props} /> : null;
		}
	};
};

export default asyncComponent;
