import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utilities";

const price = {
	Salad: 2.3,
	Bacon: 5.2,
	Cheese: 3.2,
	Meat: 7.6
};

const initialState = {
	ingredients: null,
	totalPrice: 12,
	isError: false,
	errorMessage: ""
};

let stateChanges = null;

const addIngredients = (state, action) => {
	stateChanges = {
		ingredients: {
			...state.ingredients,
			[action.payload.ingredient]:
				state.ingredients[action.payload.ingredient] + 1
		},
		totalPrice: state.totalPrice + price[action.payload.ingredient]
	};
	return updateObject(state, stateChanges);
};

const removeIngredients = (state, action) => {
	stateChanges = {
		ingredients: {
			...state.ingredients,
			[action.payload.ingredient]:
				state.ingredients[action.payload.ingredient] - 1
		},
		totalPrice: state.totalPrice - price[action.payload.ingredient]
	};
	return updateObject(state, stateChanges);
};

const setIngredients = (state, action) => {
	console.log("Inside reducers-- action :", action);
	stateChanges = {
		ingredients: {
			Salad: action.payload.ingredients.Salad,
			Bacon: action.payload.ingredients.Bacon,
			Cheese: action.payload.ingredients.Cheese,
			Meat: action.payload.ingredients.Meat
		},
		isError: false,
		errorMessage: ""
	};
	return updateObject(state, stateChanges);
};

const fetchIngredientsFailed = (state, action) => {
	return updateObject(state, {
		isError: true,
		errorMessage: action.payload.errorMessage
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENTS:
			return addIngredients(state, action);

		case actionTypes.REMOVE_INGREDIENTS:
			return removeIngredients(state, action);

		case actionTypes.SET_INGREDIENTS:
			return setIngredients(state, action);

		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return fetchIngredientsFailed(state, action);

		default:
			return state;
	}
};

export default reducer;
