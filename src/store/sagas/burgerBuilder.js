import { put } from "redux-saga/effects";

import { setIngredients, fetchIngredientsFailed } from "../actions/index";
import axios from "../../axiosOrders";

export function* initIngredientsSaga(action) {
	try {
		let response = yield axios.get(
			"https://tech-burger.firebaseio.com/ingredients.json"
		);
		yield put(setIngredients(response.data));
	} catch (error) {
		yield put(fetchIngredientsFailed(error.message)); //here so to show error in BB
	}
}
