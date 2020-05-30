import React from "react";

//components
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";

//styles
import styleSD from "./SideDrawer.module.css";

const SideDrawer = props => (
	<div className={[styleSD.SideDrawer, styleSD.Open].join(" ")}>
		<div className={styleSD.Logo}>
			<Logo />
		</div>
		<NavigationItems />
	</div>
);

export default SideDrawer;
