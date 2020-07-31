import "regenerator-runtime/runtime";
import { graphQLClient } from "../core/graphql.client";

const baseUrl = "http://localhost:3050/api/cars";

// GraphQL

export const getAllCarsGraphQl = () => {
	const query = `
			query {
				cars {
				car_id
				name
				brand
				year_release
				}
			}
		`;

	return graphQLClient.request(query).then((response) => response.cars);
};

export const getCarByIdGraphQl = (id) => {
	const query = `
		query {
			car(id: "${id}"){
				car_id
				name
				brand
				year_release
			}
		}
	  `;
	return graphQLClient.request(query).then((response) => response.car);
};

export const addCarGraphQl = (car) => {
	const query = `
		mutation($newCar: NewCar!) {
			addCar(newCar: $newCar)
		}
	`;

	return graphQLClient
		.request(query, { newCar: car })
		.then((response) => response.addCar);
};

export const deleteCarByIdGraphQl = (id) => {
	const query = `
		mutation($car_id: Int!) {
			deleteCar(car_id: $car_id)
		}
	`;

	return graphQLClient
		.request(query, { car_id: id })
		.then((response) => response.deleteCar);
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
