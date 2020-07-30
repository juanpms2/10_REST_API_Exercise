import "regenerator-runtime/runtime";
import {
	addCarRows,
	retrieveCarId,
	populateEditCarForm,
	retrieveCarForm,
	cleanTable,
} from "./uiHelpers";

import {
	getAllCars,
	getCarById,
	addCar,
	getCarsAllFetch,
	getCarByIdFetch,
	addCarFetch,
	getCarByIdAxios,
	getAllCarsAxios,
	addCarAxios,
	deleteCarByIdAxios,
	setUpRequest,
	getCarsAllAsync,
	getCarByIdAsync,
	addCarAsync,
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
	// XMLHttpRequest
	const buttonLoadCars = document.getElementById("loadcarsPromise");
	buttonLoadCars.addEventListener("click", (event) => {
		event.stopPropagation();
		cleanTable("cars-table");
		getAllCars(token)
			.then((result) => {
				addCarRows(result, "cars-table");
			})
			.catch((error) => console.log("Not found", error));
	});

	const buttonLoadCar = document.getElementById("loadcarPromise");
	buttonLoadCar.addEventListener("click", (event) => {
		event.stopPropagation();
		const carId = retrieveCarId();
		getCarById(carId, token).then((r) => populateEditCarForm(r));
	});

	const buttonAddCar = document.getElementById("addPromise");
	buttonAddCar.addEventListener("click", (event) => {
		event.stopPropagation();
		event.preventDefault();
		const car = retrieveCarForm();
		addCar(car, token)
			.then(() => {
				cleanTable("cars-table");
				return getAllCars(token);
			})
			.then((result) => {
				addCarRows(result, "cars-table");
			});
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

	// Async await
	const buttonLoadCarsAsync = document.getElementById("loadcarsAsync");
	buttonLoadCarsAsync.addEventListener("click", async (event) => {
		event.stopPropagation();
		cleanTable("cars-table");

		const data = await getCarsAllAsync(token);
		const cars = data.map((i) => i);
		addCarRows(cars, "cars-table");
	});
	const buttonLoadCarAsync = document.getElementById("loadcarAsync");
	buttonLoadCarAsync.addEventListener("click", async (event) => {
		event.stopPropagation();
		const carId = retrieveCarId();
		const data = await getCarByIdAsync(carId, token);
		populateEditCarForm(data);
	});

	const buttonAddCarAsync = document.getElementById("addAsync");
	buttonAddCarAsync.addEventListener("click", async (event) => {
		event.stopPropagation();
		event.preventDefault();
		const car = retrieveCarForm();
		try {
			await addCarAsync(car, token);
			cleanTable("cars-table");
			const newCars = await getCarsAllAsync(token);
			addCarRows(newCars, "cars-table");
			console.log("add new car ok");
		} catch (error) {
			console.log("Not found", error);
		}
	});

	// Axios
	const buttonLoadCarsAxios = document.getElementById("loadcarsAxios");
	buttonLoadCarsAxios.addEventListener("click", async (event) => {
		event.stopPropagation();
		cleanTable("cars-table");

		setUpRequest(token);
		const cars = await getAllCarsAxios();
		addCarRows(cars.data, "cars-table");
	});

	const buttonLoadCarAxios = document.getElementById("loadcarAxios");
	buttonLoadCarAxios.addEventListener("click", async (event) => {
		event.stopPropagation();
		const carId = retrieveCarId();

		setUpRequest(token);
		const car = await getCarByIdAxios(carId);
		populateEditCarForm(car);
	});

	const buttonAddCarAxios = document.getElementById("addAxios");
	buttonAddCarAxios.addEventListener("click", async (event) => {
		event.stopPropagation();
		event.preventDefault();
		const car = retrieveCarForm();

		setUpRequest(token);
		await addCarAxios(car);
		cleanTable("cars-table");
		const newCars = await getAllCarsAxios();
		addCarRows(newCars.data, "cars-table");
	});
	const buttonDeleteCarAxios = document.getElementById("deletecarAxios");
	buttonDeleteCarAxios.addEventListener("click", async (event) => {
		event.stopPropagation();
		const carId = retrieveCarId();

		setUpRequest(token);
		await deleteCarByIdAxios(carId);
		const newCars = await getAllCarsAxios();
		cleanTable("cars-table");
		addCarRows(newCars.data, "cars-table");
	});
});
