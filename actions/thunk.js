import React from "react";
import api from "../api/api";
import {
	userRegistred,
	userLoggedIn,
	error,
	makesLoaded,
	modelsLoaded,
	yearsLoaded,
	productsLoaded,
	categoriesLoaded
} from "./actions";

export const loginAsync = (data, next, remember) => dispatch => {
	return api.auth
		.login(data)
		.then(res => {
			let user = res.data.user;
			if (res.status === 200) {
				user["password"] = data.password;
				dispatch(userLoggedIn(user));
			}
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(data));
		});
};

export const registerAsync = (data, next) => dispatch => {
	return api.auth
		.register(data)
		.then(res => {
			dispatch(userRegistred(res.data));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(data));
		});
};

export const populateMakes = (next = () => {}) => dispatch => {
	return api.product
		.getMakes()
		.then(res => {
			let makes = [];
			Object.keys(res.data).map(key =>
				makes.push({ label: res.data[key], value: res.data[key] })
			);
			dispatch(makesLoaded(makes));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateModels = (make, next = () => {}) => dispatch => {
	return api.product
		.getModels(make)
		.then(res => {
			let models = [];
			for (var key in res.data) {
				models.push({ label: res.data[key], value: res.data[key] });
			}
			dispatch(modelsLoaded(models));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateYears = (make, model, next = () => {}) => dispatch => {
	return api.product
		.getYears(make, model)
		.then(res => {
			let years = [];
			for (var key in res.data) {
				years.push({ label: key, value: key });
			}
			dispatch(yearsLoaded(years));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateCategories = (next = () => {}) => dispatch => {
	return api.category
		.get()
		.then(res => {
			dispatch(categoriesLoaded(res.data));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};

export const populateProducts = (
	make,
	model,
	year,
	next = () => {}
) => dispatch => {
	return api.product
		.getProducts(make, model, year)
		.then(res => {
			console.warn(res.data.products);
			dispatch(productsLoaded(res.data.products));
			next(res);
			return res;
		})
		.catch(res => {
			next(res);
			return dispatch(error(res));
		});
};
