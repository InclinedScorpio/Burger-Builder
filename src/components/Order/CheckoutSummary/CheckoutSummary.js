import React from "react";

import Burger from "../../Burger/Burger";
import styleCS from "./CheckoutSummary.module.css";
import Button from "../../UI/Button/Button";

const CheckoutSummary = props => {
	return (
		<div className={styleCS.CheckoutSummary}>
			<h3
				style={{
					textDecoration: "undeline",
					fontWeight: "bolder",
					margin: "3%",
					textAlign: "center"
				}}
			>
				You will definitely like it !
			</h3>
			<Burger ingredients={props.ingredients} />
			<div>
				<Button btnType="Danger" clicked={props.backClicked}>
					Cancel
				</Button>
				<Button
					btnType="Success"
					clicked={props.proceedClicked}
					successBtnVisible={props.successBtnVisible}
				>
					Continue
				</Button>
			</div>
		</div>
	);
};

export default CheckoutSummary;
