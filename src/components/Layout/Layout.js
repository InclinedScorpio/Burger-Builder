import React, { Component } from "react";

//components
import Auxiliary from "../../hoc/Auxiliary";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

//style
import styleLayout from "./Layout.module.css";
import BackDrop from "../UI/BackDrop/BackDrop";

class Layout extends Component {
	state = {
		backDropVisible: true,
		sideDrawerVisible: true
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
				<Toolbar toggleSideDrawer={this.toggleSideDrawerHandler} />
				<div className={styleLayout.DesktopOnly}>
					<BackDrop
						show={this.state.backDropVisible}
						closeModal={this.backDropCloseHandler}
					/>
					<SideDrawer sideDrawerVisible={this.state.sideDrawerVisible} />
				</div>
				<main className={styleLayout.Content}>{this.props.children}</main>
			</Auxiliary>
		);
	}
}

export default Layout;
