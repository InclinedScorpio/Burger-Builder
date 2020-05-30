import React from "react";

//style
import styleTB from "./Toolbar.module.css";

const Toolbar = props => {
	return (
		<header className={styleTB.Toolbar}>
			<div>Menu</div>
			<div>LOGO</div>
			<nav> ...</nav>
		</header>
	);
};

export default Toolbar;
