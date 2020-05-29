import React from "react";
import Auxiliary from "../../hoc/Auxiliary";

const Layout = props => {
	return (
		<Auxiliary>
			<div>Sidebar, Toolbar, Backdrop</div>
			<main>{props.children}</main>
		</Auxiliary>
	);
};

export default Layout;
