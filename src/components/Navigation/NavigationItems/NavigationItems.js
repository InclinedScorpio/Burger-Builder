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
		{props.isAuthenticated && (
			<NavigationItem to="/order">Order</NavigationItem>
		)}
		{!props.isAuthenticated ? (
			<NavigationItem to="/auth">Signup | Signin</NavigationItem>
		) : (
			<NavigationItem to="/signout">Signout</NavigationItem>
		)}
	</ul>
);

export default NavigationItems;
