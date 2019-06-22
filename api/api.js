import React from "react";
import axios from "axios";

//uavparts.u0717696.cp.regruhosting.ru

export const siteUrl = "http://192.168.0.123";
export const url = siteUrl + "/api";
export const urlResolve = param => {
	if (!param) return;
	if (param.indexOf("data:image/jpeg;base64,") !== -1) return param;
	return siteUrl + param;
};

let packageData = data => {
	const form = new FormData();
	for (const key in data) {
		form.append(key, data[key]);
	}
	return form;
};

export default {
	auth: {
		login: credentials =>
			axios
				.post(url + "/auth/login", packageData(credentials))
				.then(res => res)
				.catch(({ response }) => response),
		register: credentials =>
			axios
				.post(url + "/auth/register", packageData(credentials))
				.then(res => res)
				.catch(({ response }) => response)
	},
	user: {
		getInfo: token => {
			return axios
				.post(url + "/profile/info", { Authorization: token })
				.then(res => res)
				.catch(({ response }) => response);
		}
	},
	product: {
		getMakes: () =>
			axios
				.get(url + "/store-product/get-vendors")
				.then(res => res)
				.catch(({ response }) => response),
		getModels: make =>
			axios
				.get(url + "/store-product/get-cars?vendor=" + make)
				.then(res => res)
				.catch(({ response }) => response),
		getYears: (make, model) =>
			axios
				.get(
					url +
						"/store-product/get-modification?vendor=" +
						make +
						"&car=" +
						model
				)
				.then(res => res)
				.catch(({ response }) => response),
		getProducts: (make, model, year) =>
			axios
				.get(
					url +
						"/store-product/search?vendor=" +
						make +
						"&car=" +
						model +
						"&modification=" +
						year
				)
				.then(res => res)
				.catch(({ response }) => response)
	},
	category: { get: () => axios.get(url + "/store-category") }
};
