import React from "react";

//style
import sytleLg from "./Logo.module.css";

//components
import BurgerLogo from "../../assets/images/burger-logo.png";

const Logo = props => {
	return (
		<div className={sytleLg.Logo}>
			<img src={BurgerLogo} alt="burger" />
		</div>
	);
};

export default Logo;
