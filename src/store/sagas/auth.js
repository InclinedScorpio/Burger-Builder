import axios from "axios";
import { put, delay, call } from "redux-saga/effects";

// import * as actionTypes from "../actions/actionTypes";
import {
	signoutCompletion,
	signout,
	authStart,
	authFailed,
	authSuccess,
	autoTimeout
} from "../actions/index";

export function* signoutSaga(action) {
	yield call([localStorage, "removeItem"], "token");
	yield call([localStorage, "removeItem"], "tokenExpirationDateTime");
	yield call([localStorage, "removeItem"], "userId");
	yield put(signoutCompletion());
}

export function* autoTimeoutSaga(action) {
	yield delay(action.payload.time * 1000);
	yield put(signout());
}

export function* authCheckSaga(action) {
	let { isSignup, data } = action.payload;
	put(authStart());
	let url =
		"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVtz3DTZdyEd9zgVPWifmmuUeeU_2-LFU";
	if (!isSignup) {
		url =
			"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVtz3DTZdyEd9zgVPWifmmuUeeU_2-LFU";
	}

	try {
		let response = yield axios.post(url, data);

		let tokenExpiresAt = yield new Date(
			new Date().getTime() + response.data.expiresIn * 1000
		);
		yield localStorage.setItem("userId", response.data.localId);
		yield localStorage.setItem("token", response.data.idToken);
		yield localStorage.setItem("tokenExpirationDateTime", tokenExpiresAt);

		yield put(authSuccess(response.data));
		yield put(autoTimeout(response.data.expiresIn));
	} catch (error) {
		yield put(authFailed(error.response.data.error.message));
	}
}

export function* checkAutoLoginSaga(action) {
	let token = yield localStorage.getItem("token");
	if (!token) {
		yield put(signout());
	} else {
		let timeStored = yield new Date(
			localStorage.getItem("tokenExpirationDateTime")
		);
		let remainingTime = yield (timeStored.getTime() - new Date().getTime()) /
			1000;
		if (remainingTime <= 500) {
			yield put(signout());
		} else {
			let data = {
				idToken: token,
				localId: localStorage.getItem("userId")
			};
			yield put(authSuccess(data));
			yield autoTimeout(remainingTime);
		}
	}
}
