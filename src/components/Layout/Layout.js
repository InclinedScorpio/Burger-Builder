import React from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Toolbar from "../Navigation/Toolbar/Toolbar";

//style
import styleLayout from "./Layout.module.css";

const Layout = props => {
	return (
		<Auxiliary>
			<Toolbar />
			<main className={styleLayout.Content}>{props.children}</main>
		</Auxiliary>
	);
};

export default Layout;
