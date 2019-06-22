import React from "react";

export const userLoggedIn = user => ({
	type: "USER_LOGGED_IN",
	user
});

export const userLoggedOut = user => ({
	type: "USER_LOGGED_OUT",
	user
});

export const userRegistred = user => ({
	type: "USER_REGISTRED",
	user
});

export const makesLoaded = makes => ({
	type: "MAKES_LOADED",
	makes
});

export const modelsLoaded = models => ({
	type: "MODELS_LOADED",
	models
});

export const yearsLoaded = years => ({
	type: "YEARS_LOADED",
	years
});

export const productsLoaded = products => ({
	type: "PRODUCTS_LOADED",
	products
});

export const categoriesLoaded = categories => ({
	type: "CATEGORIES_LOADED",
	categories
});

export const addToCart = product => ({
	type: "ADD_TO_CART",
	product
});

export const removeFromCart = product => ({
	type: "REMOVE_FROM_CART",
	product
});

export const clearCart = () => ({
	type: "CLEAR_CART"
});

export const error = err => ({ type: "ERROR", error: err });
