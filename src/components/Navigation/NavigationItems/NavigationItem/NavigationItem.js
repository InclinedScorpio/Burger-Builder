import React from "react";

//style
import styleNI from "./NavigationItem.module.css";

const NavigationItem = props => (
	<li className={styleNI.NavigationItem}>
		<a href="#" className={props.active ? styleNI.a : null}>
			{props.children}
		</a>
	</li>
);

export default NavigationItem;
