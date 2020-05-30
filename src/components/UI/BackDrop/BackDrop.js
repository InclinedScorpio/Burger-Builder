import React from "react";

//style
import styleBD from "./BackDrop.module.css";

const BackDrop = props => {
	return (
		props.show && (
			<div className={styleBD.BackDrop} onClick={props.closeModal}></div>
		)
	);
};

export default BackDrop;
