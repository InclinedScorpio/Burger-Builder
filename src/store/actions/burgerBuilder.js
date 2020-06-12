import * as actionTypes from "./actionTypes";
import axios from "../../axiosOrders";

export const addIngredient = ingredient => {
	return {
		type: actionTypes.ADD_INGREDIENTS,
		payload: { ingredient: ingredient }
	};
};

export const removeIngredient = ingredient => {
	return {
		type: actionTypes.REMOVE_INGREDIENTS,
		payload: { ingredient: ingredient }
	};
};

export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		payload: { ingredients: ingredients }
	};
};

export const fetchIngredientsFailed = err => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
		payload: { errorMessage: err }
	};
};

export const initIngredients = () => {
	return dispatch => {
		console.log("[ACTION-BURGERBUILDER]:initIngredients");
		axios
			.get("https://tech-burger.firebaseio.com/ingredients.json")
			.then(res => {
				console.log("Result received RES:::", res);
				dispatch(setIngredients(res.data));
			})
			.catch(err => {
				console.log("Error is :::", err);
				dispatch(fetchIngredientsFailed(err.message)); //here so to show error in BB
			});
	};
};
