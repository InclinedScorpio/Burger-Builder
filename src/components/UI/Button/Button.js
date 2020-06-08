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
	let styleClasses = [styleBtn.Button, styleBtn[props.btnType]];

	if (props.disabled) {
		styleClasses.push(styleBtn.Disabled);
	}

	return (
		props.successBtnVisible && (
			<button
				className={styleClasses.join(" ")}
				onClick={props.clicked}
				disabled={props.disabled}
			>
				{props.children}
			</button>
		)
	);
};

Button.defaultProps = {
	successBtnVisible: true,
	disabled: false
};

export default Button;
