import React from "react";

//style
import styleNI from "./NavigationItems.module.css";

//components
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = props => (
	<ul className={styleNI.NavigationItems}>
		<NavigationItem to="/" exact>
			Prepare Burger
		</NavigationItem>
		<NavigationItem to="/order">Order</NavigationItem>
	</ul>
);

export default NavigationItems;
