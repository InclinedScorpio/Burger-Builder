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
	return {
		type: actionTypes.INITIATE_INIT_INGREDIENTS
	};
};

export const burgerBuildingStarted = () => {
	return {
		type: actionTypes.BURGER_BUILDING_STARTED
	};
};

export const resetBurgerBuilder = () => {
	return {
		type: actionTypes.RESET_BURGER_BUILDER
	};
};
