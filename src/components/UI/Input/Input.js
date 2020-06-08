import React from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

import styleInput from "./Input.module.css";

const Input = props => {
	let inputClasses = [styleInput.InputElement];
	if (!props.isValid) {
		inputClasses.push(styleInput.Error);
	}

	console.log("CALLED !!!!!isVALIDIIIIIDD:::", props.isValid);
	let inputElement = null;
	switch (props.elementType) {
		case "input":
			inputElement = (
				<Auxiliary>
					<label>{props.errorMessage}</label>
					<input
						type="text"
						className={inputClasses.join(" ")}
						{...props.config}
						onChange={props.inputChanged}
					/>
				</Auxiliary>
			);
			break;
		case "textarea":
			inputElement = (
				<Auxiliary>
					<label>{props.errorMessage}</label>
					<textarea
						className={inputClasses.join(" ")}
						{...props.config}
						onChange={props.inputChanged}
					/>
				</Auxiliary>
			);
			break;
		case "select":
			inputElement = (
				<Auxiliary>
					<label>{props.errorMessage}</label>
					<select
						className={inputClasses.join(" ")}
						{...props.config}
						onChange={props.inputChanged}
					>
						{props.config.options.map(opt => {
							return <option value={opt.value}>{opt.label}</option>;
						})}
					</select>
				</Auxiliary>
			);
			break;
		default:
			inputElement = (
				<Auxiliary>
					<input
						type="text"
						className={inputClasses.join(" ")}
						{...props}
						onChange={props.inputChanged}
					/>
				</Auxiliary>
			);
	}

	return (
		<div className={styleInput.Input}>
			<label className={styleInput.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default Input;
