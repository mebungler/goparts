import React from "react";
import StorageService from "../services/StorageService";

export const user = (state = {}, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			StorageService.setState(action.user);
			StorageService.saveChanges();
			return { ...action.user };
		case "USER_LOGGED_OUT":
			StorageService.setState("NA");
			StorageService.saveChanges();
			return {};
		case "USER_REGISTRED":
			StorageService.setState(action.user);
			StorageService.saveChanges();
			return { ...action.user };
		default:
			return state;
	}
};

export const makes = (state = [], action) => {
	switch (action.type) {
		case "MAKES_LOADED":
			return action.makes;
		default:
			return state;
	}
};
export const models = (state = [], action) => {
	switch (action.type) {
		case "MODELS_LOADED":
			return action.models;
		default:
			return state;
	}
};

export const years = (state = [], action) => {
	switch (action.type) {
		case "YEARS_LOADED":
			return action.years;
		default:
			return state;
	}
};

export const products = (state = [], action) => {
	switch (action.type) {
		case "PRODUCTS_LOADED":
			return action.products;
		default:
			return state;
	}
};

export const categories = (state = [], action) => {
	switch (action.type) {
		case "CATEGORIES_LOADED":
			return action.categories;
		default:
			return state;
	}
};

export const cart = (state = [], action) => {
	switch (action.type) {
		case "ADD_TO_CART":
			return [...state, product];
		case "REMOVE_FROM_CART":
			return [
				...state.slice(0, action.index),
				...state.slice(action.index + 1)
			];
		case "CLEAR_CART":
			return [];
		default:
			return state;
	}
};

export const error = (state = {}, action) => {
	switch (action.type) {
		case "ERROR":
			return action.error;
		default:
			return state;
	}
};
