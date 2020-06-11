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
	totalPrice: 12
};

let stateChanges = null;

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENTS:
			stateChanges = {
				ingredients: {
					...state.ingredients,
					[action.payload.ingredient]:
						state.ingredients[action.payload.ingredient] + 1
				},
				totalPrice: state.totalPrice + price[action.payload.ingredient]
			};
			return updateObject(state, stateChanges);

		case actionTypes.REMOVE_INGREDIENTS:
			stateChanges = {
				ingredients: {
					...state.ingredients,
					[action.payload.ingredient]:
						state.ingredients[action.payload.ingredient] - 1
				},
				totalPrice: state.totalPrice - price[action.payload.ingredient]
			};
			return updateObject(state, stateChanges);

		case actionTypes.INIT_INGREDIENTS:
			console.log("Inside reducers-- action :", action);
			stateChanges = {
				ingredients: {
					Salad: action.payload.ingredients.Salad,
					Bacon: action.payload.ingredients.Bacon,
					Cheese: action.payload.ingredients.Cheese,
					Meat: action.payload.ingredients.Meat
				}
			};
			console.log("state changes:::", stateChanges);
			return updateObject(state, stateChanges);

		default:
			return state;
	}
};

export default reducer;
