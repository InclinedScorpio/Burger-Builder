import * as actionTypes from "./actionTypes";

export const authStart = () => {
	return {
		type: actionTypes.AUTHCHECK_START
	};
};

export const authSuccess = data => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		payload: { token: data.idToken, userId: data.localId }
	};
};

export const authFailed = error => {
	return {
		type: actionTypes.AUTH_FAILED,
		payload: { errorMessage: error }
	};
};

export const authCheck = (data, isSignup) => {
	return {
		type: actionTypes.INITIATE_SIGNIN,
		payload: { isSignup: isSignup, data }
	};
};

export const removeError = () => {
	return {
		type: actionTypes.REMOVE_ERRORS
	};
};

export const signout = () => {
	return {
		type: actionTypes.INITIATE_SIGNOUT
	};
};

export const signoutCompletion = () => {
	return {
		type: actionTypes.SIGNOUT
	};
};

export const autoTimeout = timeOutDuration => {
	return {
		type: actionTypes.INITIATE_TIMEOUT,
		payload: { time: timeOutDuration }
	};
};

export const checkAutoLoginStatus = () => {
	return {
		type: actionTypes.INITIATE_AUTO_LOGIN
	};
};
