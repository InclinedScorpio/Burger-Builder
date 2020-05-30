import React from "react";

//style
import styleNI from "./NavigationItem.module.css";

const NavigationItem = props => (
	<li className={styleNI.NavigationItem}>
		<a href="#">{props.children}</a>
	</li>
);

export default NavigationItem;
