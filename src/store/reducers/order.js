import * as actionTypes from "../actions/actionTypes";

const initialState = {
	orders: [],
	isLoading: false,
	purchased: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.BURGER_PURCHASED:
			return {
				...state,
				orders: state.orders.concat(action.payload.burgerData),
				isLoading: false,
				purchased: true
			};

		case actionTypes.BURGER_PURCHASE_STARTED:
			return { ...state, isLoading: true };

		case actionTypes.BURGER_PURCHASE_FAILED:
			return { ...state, isLoading: false };

		case actionTypes.BURGER_PURCHASE_COMPLETED:
			return { ...state, purchased: false };

		default:
			return state;
	}
};

export default reducer;
