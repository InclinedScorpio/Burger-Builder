import React from "react";

//style
import styleSDT from "./SideDrawerToggle.module.css";

const SideDrawerToggle = props => {
	return (
		<div className={styleSDT.DrawerToggle} onClick={props.toggleSideDrawer}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default SideDrawerToggle;
