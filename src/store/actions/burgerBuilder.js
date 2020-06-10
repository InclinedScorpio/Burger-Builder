import * as actionTypes from "./actionTypes";

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
