import * as actionTypes from "./actionTypes";
import axios from "axios";

const authStart = () => {
	return {
		type: actionTypes.AUTHCHECK_START
	};
};

const authSuccess = data => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		payload: { token: data.idToken, userId: data.localId }
	};
};

const authFailed = error => {
	return {
		type: actionTypes.AUTH_FAILED,
		payload: { errorMessage: error }
	};
};

export const authCheck = (data, isSignup) => {
	return dispatch => {
		dispatch(authStart());
		let url =
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVtz3DTZdyEd9zgVPWifmmuUeeU_2-LFU";
		if (!isSignup) {
			url =
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVtz3DTZdyEd9zgVPWifmmuUeeU_2-LFU";
		}

		axios
			.post(url, data)
			.then(res => {
				let tokenExpiresAt = new Date(
					new Date().getTime() + res.data.expiresIn * 1000
				);
				localStorage.setItem("token", res.data.idToken);
				localStorage.setItem("tokenExpirationDateTime", tokenExpiresAt);
				localStorage.setItem("userId", res.data.localId);

				dispatch(authSuccess(res.data));
				dispatch(autoTimeout(res.data.expiresIn));
			})
			.catch(err => {
				dispatch(authFailed(err.response.data.error.message));
			});
	};
};

export const removeError = () => {
	return {
		type: actionTypes.REMOVE_ERRORS
	};
};

export const signout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("tokenExpirationDateTime");
	localStorage.removeItem("userId");
	return {
		type: actionTypes.SIGNOUT
	};
};

const autoTimeout = timeOutDuration => {
	return dispatch => {
		setTimeout(() => {
			dispatch(signout());
		}, timeOutDuration * 1000);
	};
};

export const checkAutoLoginStatus = () => {
	return dispatch => {
		let token = localStorage.getItem("token");
		if (!token) {
			dispatch(signout());
		} else {
			let timeStored = new Date(
				localStorage.getItem("tokenExpirationDateTime")
			);
			let remainingTime = (timeStored.getTime() - new Date().getTime()) / 1000;
			if (remainingTime <= 500) {
				dispatch(signout());
			} else {
				let data = {
					idToken: token,
					localId: localStorage.getItem("userId")
				};
				dispatch(authSuccess(data));
				autoTimeout(remainingTime);
			}
		}
	};
};
