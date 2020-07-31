import "regenerator-runtime/runtime";
import {
	addCarRows,
	retrieveCarId,
	populateEditCarForm,
	retrieveCarForm,
	cleanTable,
} from "./uiHelpers";

import {
	getCarsAllFetch,
	getCarByIdFetch,
	addCarFetch,
	getCarByIdGraphQl,
	getAllCarsGraphQl,
	addCarGraphQl,
	deleteCarByIdGraphQl,
} from "./API/carsApi";

function getParameterByName() {
	var result = [];
	var parts = [];

	location.search
		.substr(1)
		.split("&")
		.forEach(function (item) {
			parts = item.split("=");
			if (parts[0] != "") {
				result.push(parts);
			}
		});

	return result[0][1];
}
const token = getParameterByName();

document.addEventListener("DOMContentLoaded", () => {
	// GraphQL
	const buttonLoadCarsAxios = document.getElementById("loadcarsAxios");
	buttonLoadCarsAxios.addEventListener("click", async (event) => {
		event.stopPropagation();
		cleanTable("cars-table");

		const cars = await getAllCarsGraphQl();
		addCarRows(cars, "cars-table");
	});

	const buttonLoadCarAxios = document.getElementById("loadcarAxios");
	buttonLoadCarAxios.addEventListener("click", async (event) => {
		event.stopPropagation();
		const carId = retrieveCarId();

		const car = await getCarByIdGraphQl(carId);
		populateEditCarForm(car);
	});

	const buttonAddCarAxios = document.getElementById("addAxios");
	buttonAddCarAxios.addEventListener("click", async (event) => {
		event.stopPropagation();
		event.preventDefault();
		const car = retrieveCarForm();

		await addCarGraphQl(car);
		cleanTable("cars-table");
		const newCars = await getAllCarsGraphQl();
		addCarRows(newCars, "cars-table");
	});
	const buttonDeleteCarAxios = document.getElementById("deletecarAxios");
	buttonDeleteCarAxios.addEventListener("click", async (event) => {
		event.stopPropagation();
		const carId = retrieveCarId();

		await deleteCarByIdGraphQl(carId);
		const newCars = await getAllCarsGraphQl();
		cleanTable("cars-table");
		addCarRows(newCars, "cars-table");
	});

	// Fetch
	const buttonLoadCarsFetch = document.getElementById("loadcarsFetch");
	buttonLoadCarsFetch.addEventListener("click", (event) => {
		event.stopPropagation();
		cleanTable("cars-table");

		getCarsAllFetch(token).then((data) => {
			const cars = data.map((i) => i);
			addCarRows(cars, "cars-table");
		});
	});

	const buttonLoadCarFetch = document.getElementById("loadcarFetch");
	buttonLoadCarFetch.addEventListener("click", (event) => {
		event.stopPropagation();
		const carId = retrieveCarId();
		getCarByIdFetch(carId, token).then((data) => {
			populateEditCarForm(data);
		});
	});

	const buttonAddCarFetch = document.getElementById("addFetch");
	buttonAddCarFetch.addEventListener("click", (event) => {
		event.stopPropagation();
		event.preventDefault();
		const car = retrieveCarForm();
		addCarFetch(car, token)
			.then(() => {
				cleanTable("cars-table");
				return getCarsAllFetch(token);
			})
			.then((result) => {
				addCarRows(result, "cars-table");
				console.log("add new car ok");
			});
	});
});
