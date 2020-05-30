import React from "react";

//components
import Auxiliary from "../../hoc/Auxiliary";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

//style
import styleLayout from "./Layout.module.css";

const Layout = props => {
	return (
		<Auxiliary>
			<Toolbar />
			<div className={styleLayout.DesktopOnly}>
				<SideDrawer />
			</div>
			<main className={styleLayout.Content}>{props.children}</main>
		</Auxiliary>
	);
};

export default Layout;
