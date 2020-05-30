import React from "react";

//style
import styleBtn from "./Button.module.css";

const Button = props => {
	return (
		<button
			className={[styleBtn.Button, styleBtn[props.btnType]].join(" ")}
			onClick={props.clicked}
		>
			{props.children}
		</button>
	);
};

export default Button;
