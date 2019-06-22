import React from "react";
import { AsyncStorage } from "react-native";

let state = {};

const initialize = () =>
	AsyncStorage.getItem("@Uaeparts.com:token")
		.then(result => {
			if (!result) {
				AsyncStorage.setItem("@Uaeparts.com:token", "NA");
			}
			state = JSON.parse(result);
		})
		.catch(() => AsyncStorage.setItem("@Uaeparts.com:token", ""));

const saveChanges = async () => {
	try {
		let temp = {};
		for (var key in state) {
			temp[key] = state[key] === null ? "" : state[key];
		}
		let str = JSON.stringify(temp);
		AsyncStorage.setItem("@Uaeparts.com:token", str);
	} catch (e) {}
};

const getState = () => state;

const setState = e => (state = e);

export default {
	initialize,
	saveChanges,
	getState,
	setState
};
