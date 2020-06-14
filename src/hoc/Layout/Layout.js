import React, { Component } from "react";
import { connect } from "react-redux";

//components
import Auxiliary from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import BackDrop from "../../components/UI/BackDrop/BackDrop";

//style
import styleLayout from "./Layout.module.css";

class Layout extends Component {
	state = {
		backDropVisible: false,
		sideDrawerVisible: false
	};

	backDropCloseHandler = () => {
		this.setState({
			backDropVisible: false,
			sideDrawerVisible: false
		});
	};

	backDropOpenHandler = () => {
		this.setState({
			backDropVisible: true,
			sideDrawerVisible: true
		});
	};

	toggleSideDrawerHandler = () => {
		this.setState((prevState, props) => {
			return {
				sideDrawerVisible: !prevState.sideDrawerVisible,
				backDropVisible: !prevState.backDropVisible
			};
		});
	};

	render() {
		return (
			<Auxiliary>
				<Toolbar
					toggleSideDrawer={this.toggleSideDrawerHandler}
					isAuthenticated={this.props.isAuthenticated}
				/>
				<div className={styleLayout.DesktopOnly}>
					<BackDrop
						show={this.state.backDropVisible}
						closeModal={this.backDropCloseHandler}
					/>
					<SideDrawer
						sideDrawerVisible={this.state.sideDrawerVisible}
						isAuthenticated={this.props.isAuthenticated}
					/>
				</div>
				<main className={styleLayout.Content}>{this.props.children}</main>
			</Auxiliary>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token ? true : false
	};
};

export default connect(mapStateToProps)(Layout);
