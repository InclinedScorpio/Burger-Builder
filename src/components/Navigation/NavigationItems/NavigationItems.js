import React from "react";

//style
import styleNI from "./NavigationItems.module.css";

//components
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = props => (
	<ul className={styleNI.NavigationItems}>
		<NavigationItem active="true">Prepare Burger</NavigationItem>
		<NavigationItem>Checkout</NavigationItem>
	</ul>
);

export default NavigationItems;
