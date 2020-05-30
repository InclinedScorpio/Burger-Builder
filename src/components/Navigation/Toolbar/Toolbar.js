import React from "react";

//style
import styleTB from "./Toolbar.module.css";

//components
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = props => {
	return (
		<header className={styleTB.Toolbar}>
			<div>Menu</div>
			<div className={styleTB.Logo}>
				<Logo />
			</div>
			<nav className={styleTB.DesktopOnly}>
				{" "}
				<NavigationItems />
			</nav>
		</header>
	);
};

export default Toolbar;
