import { takeEvery, takeLatest, all } from "redux-saga/effects";
import {
	signoutSaga,
	autoTimeoutSaga,
	authCheckSaga,
	checkAutoLoginSaga
} from "./auth";

import { initIngredientsSaga } from "./burgerBuilder";

import {
	INITIATE_SIGNOUT,
	INITIATE_TIMEOUT,
	INITIATE_SIGNIN,
	INITIATE_AUTO_LOGIN,
	INITIATE_INIT_INGREDIENTS
} from "../actions/actionTypes";

export function* watchAuth() {
	yield all([
		takeEvery(INITIATE_SIGNOUT, signoutSaga),
		takeEvery(INITIATE_TIMEOUT, autoTimeoutSaga),
		takeEvery(INITIATE_SIGNIN, authCheckSaga),
		takeEvery(INITIATE_AUTO_LOGIN, checkAutoLoginSaga)
	]);
}

export function* watchBurgerBuilder() {
	yield takeLatest(INITIATE_INIT_INGREDIENTS, initIngredientsSaga);
}

db.persons
	.aggregate([
		{
			$project: {
				_id: 0,
				gender: 1,
				name: 1,
				location: {
					type: "Point",
					coordinates: [
						{
							$convert: {
								input: "$location.coordinates.longitude",
								to: "double",
								onError: "0.0",
								onNull: "0.0"
							}
						},
						{
							$toDouble: "$location.coordinates.latitude"
						}
					]
				},
				dob: {
					$convert: {
						input: "$dob.date",
						to: "date"
					}
				},
				age: "$dob.age"
			}
		},
		{
			$project: {
				gender: 1,
				location: 1,
				dob: 1,
				age: 1,
				fullname: {
					$concat: [
						{ $toUpper: { $substrCP: ["$name.first", 0, 1] } },
						{
							$substrCP: [
								"$name.first",
								1,
								{ $subtract: [{ $strLenCP: "$name.first" }, 1] }
							]
						},
						" ",
						{ $toUpper: { $substrCP: ["$name.last", 0, 1] } },
						{
							$substrCP: [
								"$name.last",
								1,
								{ $subtract: [{ $strLenCP: "$name.last" }, 1] }
							]
						}
					]
				}
			}
		},
		{
			$group: {
				_id: { birthYear: { $isoWeekYear: "$dob" } },
				totalPersons: { $sum: 1 }
			}
		},
		{ $sort: { totalPersons: -1 } }
	])
	.pretty();

db.friends
	.aggregate([
		{ $unwind: "$hobbies" },
		{
			$group: { _id: { age: "$age" }, hobbies: { $addToSet: "$hobbies" } }
		}
	])
	.pretty();
// db.friends
// 	.aggregate([
// 		{ $group: { _id: { age: "$age" }, hobbies: { $push: "$hobbies" } } }
// 	])
// 	.pretty();
db.transformedPersons
	.aggregate([
		{
			$geoNear: {
				near: { type: "Point", coordinates: [-90.4049, -65.2] },
				maxDistance: 100000,
				distanceField: "distance",
				query: { age: { $gt: 30 } }
			}
		},
		{ $limit: 10 }
	])
	.pretty();
