import * as actionTypes from "../actions/actionTypes";

const price = {
	Salad: 2.3,
	Bacon: 5.2,
	Cheese: 3.2,
	Meat: 7.6
};

const initialState = {
	ingredients: {
		Bacon: 0,
		Cheese: 0,
		Meat: 0,
		Salad: 0
	},
	totalPrice: 12
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENTS:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.payload.ingredient]:
						state.ingredients[action.payload.ingredient] + 1
				},
				totalPrice: state.totalPrice + price[action.payload.ingredient]
			};
		case actionTypes.REMOVE_INGREDIENTS:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.payload.ingredient]:
						state.ingredients[action.payload.ingredient] - 1
				},
				totalPrice: state.totalPrice - price[action.payload.ingredient]
			};
		default:
			return state;
	}
};

export default reducer;
