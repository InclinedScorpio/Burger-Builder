import * as actionTypes from "./actionTypes";
import axios from "../../axiosOrders";

const burgerPurchased = burgerData => {
	return {
		type: actionTypes.BURGER_PURCHASED,
		payload: { burgerData: burgerData }
	};
};

const burgerPurchaseFailed = () => {
	return {
		type: actionTypes.BURGER_PURCHASE_FAILED
	};
};

const burgerPurchaseStarted = () => {
	return {
		type: actionTypes.BURGER_PURCHASE_STARTED
	};
};

export const burgerPurchaseCompleted = () => {
	return {
		type: actionTypes.BURGER_PURCHASE_COMPLETED
	};
};

export const purchaseBurger = (postData, token) => {
	return dispatch => {
		dispatch(burgerPurchaseStarted());
		axios
			.post("/orders.json?auth=" + token, { postData })
			.then(res => {
				console.log("[Order Reducer]: purchaseBurger, res", res.data.name);
				dispatch(
					burgerPurchased({
						id: res.data.name,
						ingredients: postData.ingredients,
						totalPrice: postData.totalPrice
					})
				);
			})
			.catch(err => {
				dispatch(burgerPurchaseFailed());
			});
	};
};
