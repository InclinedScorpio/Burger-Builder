import React from "react";

//style
import styleBtn from "./Button.module.css";

/**
 *
 * @param {btnType} Success|Danger|required
 * @param {clicked} function()|required
 * @param {successBtnVisible} bool|optional
 */
const Button = props => {
	return (
		props.successBtnVisible && (
			<button
				className={[styleBtn.Button, styleBtn[props.btnType]].join(" ")}
				onClick={props.clicked}
			>
				{props.children}
			</button>
		)
	);
};

Button.defaultProps = {
	successBtnVisible: true
};

export default Button;
