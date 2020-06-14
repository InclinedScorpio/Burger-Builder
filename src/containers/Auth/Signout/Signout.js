import React, { Component } from "react";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Signout extends Component {
	componentDidMount = () => {
		this.props.onSignout();
	};

	render() {
		return <Redirect to="/" />;
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSignout: () => dispatch(actions.signout())
	};
};

export default connect(null, mapDispatchToProps)(Signout);
