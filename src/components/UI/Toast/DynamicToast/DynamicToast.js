import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import styleDyToast from "./DynamicToast.module.css";

let isToastVisible = true;

/**
 * @config
 * time: number
 * type: success | error | info | warning
 * message: string
 * fontLarge: boolean
 */

function Alert(props) {
	return <MuiAlert elevation={8} variant="filled" {...props} />;
}

export default function CustomizedSnackbars(props) {
	const [open, setOpen] = React.useState(isToastVisible);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		props.hideToast(false);
		setOpen(false);
	};

	return (
		<div className={styleDyToast.DynamicToast}>
			<Snackbar
				open={open}
				autoHideDuration={props.config.time ? props.config.time : 3000}
				onClose={handleClose}
			>
				<Alert
					severity={props.config.type}
					className={
						props.fontLarge ? styleDyToast.FontLarge : styleDyToast.FontMedium
					}
				>
					{props.config.message}
				</Alert>
			</Snackbar>
		</div>
	);
}
