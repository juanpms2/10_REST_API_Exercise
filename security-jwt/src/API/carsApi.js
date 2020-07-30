import "regenerator-runtime/runtime";
import Axios from "axios";

const baseUrl = "http://localhost:3050/api/cars";

// XMLHttpRequest
export const getAllCars = (token) => {
	return new Promise((resolve) => {
		const data = new XMLHttpRequest();
		data.overrideMimeType("application/json");
		data.onload = () => resolve(JSON.parse(data.response));
		data.open("get", baseUrl);
		data.setRequestHeader("Authorization", `Bearer ${token}`);
		data.send();
	});
};

export const getCarById = (id, token) => {
	return new Promise((resolve) => {
		const data = new XMLHttpRequest();
		data.overrideMimeType("application/json");
		data.onload = () => {
			const car = JSON.parse(data.response)
				.map((i) => i)
				.find((c) => c.car_id === id);
			resolve(car);
		};
		data.open("get", baseUrl);
		data.setRequestHeader("Authorization", `Bearer ${token}`);
		data.send();
	});
};

export const addCar = (car, token) => {
	const json = JSON.stringify({ ...car });
	return new Promise((resolve) => {
		const data = new XMLHttpRequest();
		data.open("POST", baseUrl);
		data.setRequestHeader("Authorization", `Bearer ${token}`);
		data.setRequestHeader("Content-type", "application/json; charset=utf-8");
		data.send(json);
		resolve("ok");
	});
};

//Fetch

export const getCarsAllFetch = (headers) => {
	return fetch(baseUrl, {
		headers: {
			Authorization: `Bearer ${headers}`,
		},
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw response.status;
			}
		})
		.catch((error) => console.log("Not found", error));
};

export const getCarByIdFetch = (carId, token) => {
	return fetch(baseUrl, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw response.status;
			}
		})
		.then((data) => {
			const car = data.map((i) => i).find((c) => c.car_id === carId);
			return car;
		})
		.catch((error) => console.log("Not found", error));
};

export const addCarFetch = (car, token) => {
	return fetch(baseUrl, {
		method: "POST",
		body: JSON.stringify(car),
		headers: {
			Authorization: `Bearer ${token}`,
			"content-type": "application/json",
		},
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw response.status;
			}
		})
		.then((data) => {
			return data;
		})
		.catch((error) => console.log("Not found", error));
};

// Async await
export const getCarsAllAsync = async (token) => {
	const headers = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const response = await fetch(baseUrl, headers);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("Not found", error);
	}
};

export const getCarByIdAsync = async (carId, token) => {
	const headers = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const response = await fetch(baseUrl, headers);
		const data = await response.json();
		const car = data.map((i) => i).find((c) => c.car_id === carId);
		return car;
	} catch (error) {
		console.log("Not found", error);
	}
};

export const addCarAsync = async (car, token) => {
	const method = {
		method: "POST",
		body: JSON.stringify(car),
		headers: {
			Authorization: `Bearer ${token}`,
			"content-type": "application/json",
		},
	};
	try {
		const response = await fetch(baseUrl, method);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("Not found", error);
	}
};

// Axios

// Interceptor axios
export const setUpRequest = (token) => {
	Axios.interceptors.request.use(
		(config) => {
			config.headers["Authorization"] = `Bearer ${token}`;
			return config;
		},
		(err) => {
			return Promise.reject(err);
		}
	);
};

export const getAllCarsAxios = () => {
	return Axios.get(baseUrl).then((cars) => cars);
};

export const getCarByIdAxios = (id) => {
	return Axios.get(baseUrl)
		.then((cars) => {
			const car = cars.data.map((i) => i).find((c) => c.car_id === id);
			return car;
		})
		.catch((error) => console.log("Not found", error));
};

export const addCarAxios = (car) => {
	const method = {
		method: "post",
		data: car,
		url: baseUrl,
	};
	return Axios(method)
		.then((data) => {
			return data.data;
		})
		.catch((error) => {
			console.log("Not found", error);
		});
};

export const deleteCarByIdAxios = (id) => {
	return Axios.delete(`${baseUrl}/${id}`)
		.then((cars) => {
			return cars;
		})
		.catch((error) => console.log("Not found", error));
};
