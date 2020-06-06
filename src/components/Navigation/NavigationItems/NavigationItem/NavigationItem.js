import React from "react";
import { NavLink } from "react-router-dom";

//style
import styleNI from "./NavigationItem.module.css";

const NavigationItem = props => (
	<li className={styleNI.NavigationItem}>
		<NavLink to={props.to} exact={props.exact} activeClassName={styleNI.active}>
			{props.children}
		</NavLink>
	</li>
);

export default NavigationItem;
