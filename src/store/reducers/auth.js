import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

const initialState = {
	token: null,
	userId: null,
	loading: false,
	isError: false,
	errorMessage: ""
};

const signupStart = state => {
	return updateObject(state, { loading: true });
};

const signupSuccess = (state, action) => {
	return updateObject(state, {
		loading: false,
		isError: false,
		errorMessage: "",
		token: action.payload.token,
		userId: action.payload.userId
	});
};

const signupFailed = (state, action) => {
	return updateObject(state, {
		token: null,
		userId: null,
		loading: false,
		isError: true,
		errorMessage: action.payload.errorMessage
	});
};

const signout = state => {
	return updateObject(state, {
		...initialState
	});
};

const removeErrors = (state, action) => {
	return updateObject(state, {
		isError: false,
		errorMessage: ""
	});
};

const reducers = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTHCHECK_START:
			return signupStart(state);

		case actionTypes.AUTH_SUCCESS:
			return signupSuccess(state, action);

		case actionTypes.AUTH_FAILED:
			return signupFailed(state, action);

		case actionTypes.REMOVE_ERRORS:
			return removeErrors(state, action);

		case actionTypes.SIGNOUT:
			return signout(state);

		default:
			return state;
	}
};

export default reducers;
