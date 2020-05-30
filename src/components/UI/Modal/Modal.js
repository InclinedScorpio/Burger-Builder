import React from "react";

//style
import styleModal from "./Modal.module.css";
import BackDrop from "../BackDrop/BackDrop";
import Auxiliary from "../../../hoc/Auxiliary";

const Modal = props => {
	return (
		<Auxiliary>
			<BackDrop show={props.show} closeModal={props.closeModal} />
			<div
				className={styleModal.Modal}
				style={{
					transform: props.show ? "translate(0vw)" : "translate(0,-100vh)",
					opacity: props.show ? 1 : 0
				}}
			>
				{props.children}
			</div>
		</Auxiliary>
	);
};

export default Modal;
