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
	getCarsAllAsync,
	getCarByIdAsync,
	addCarAsync,
} from "./API/carsApi";

document.addEventListener("DOMContentLoaded", () => {
	// XMLHttpRequest
	const buttonLoadCars = document.getElementById("loadcarsPromise");
	buttonLoadCars.addEventListener("click", (event) => {
		event.stopPropagation();
		cleanTable("cars-table");
		getAllCars()
			.then((result) => {
				addCarRows(result, "cars-table");
			})
			.catch((error) => console.log("Not found", error));
	});

	const buttonLoadCar = document.getElementById("loadcarPromise");
	buttonLoadCar.addEventListener("click", (event) => {
		event.stopPropagation();
		const carId = retrieveCarId();
		getCarById(carId).then((r) => populateEditCarForm(r));
	});

	const buttonAddCar = document.getElementById("addPromise");
	buttonAddCar.addEventListener("click", (event) => {
		event.stopPropagation();
		event.preventDefault();
		const car = retrieveCarForm();
		addCar(car)
			.then((_) => {
				cleanTable("cars-table");
				return getAllCars();
			})
			.then((result) => {
				addCarRows(result, "cars-table");
			});
	});

	// Fetch
	const buttonLoadCarsFetch = document.getElementById("loadcarsFetch");
	buttonLoadCarsFetch.addEventListener("click", async (event) => {
		event.stopPropagation();
		cleanTable("cars-table");

		getCarsAllFetch().then((data) => {
			const cars = data.map((i) => i);
			addCarRows(cars, "cars-table");
		});
	});

	const buttonLoadCarFetch = document.getElementById("loadcarFetch");
	buttonLoadCarFetch.addEventListener("click", (event) => {
		event.stopPropagation();
		const carId = retrieveCarId();
		getCarByIdFetch(carId).then((data) => {
			populateEditCarForm(data);
		});
	});

	const buttonAddCarFetch = document.getElementById("addFetch");
	buttonAddCarFetch.addEventListener("click", (event) => {
		event.stopPropagation();
		event.preventDefault();
		const car = retrieveCarForm();
		addCarFetch(car)
			.then(() => {
				cleanTable("cars-table");
				return getCarsAllFetch();
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

		const data = await getCarsAllAsync();
		const cars = data.map((i) => i);
		addCarRows(cars, "cars-table");
	});
	const buttonLoadCarAsync = document.getElementById("loadcarAsync");
	buttonLoadCarAsync.addEventListener("click", async (event) => {
		event.stopPropagation();
		const carId = retrieveCarId();
		const data = await getCarByIdAsync(carId);
		populateEditCarForm(data);
	});

	const buttonAddCarAsync = document.getElementById("addAsync");
	buttonAddCarAsync.addEventListener("click", async (event) => {
		event.stopPropagation();
		event.preventDefault();
		const car = retrieveCarForm();
		try {
			await addCarAsync(car);
			cleanTable("cars-table");
			const newCars = await getCarsAllAsync();
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
		const cars = await getAllCarsAxios();
		addCarRows(cars.data, "cars-table");
	});

	const buttonLoadCarAxios = document.getElementById("loadcarAxios");
	buttonLoadCarAxios.addEventListener("click", async (event) => {
		event.stopPropagation();
		const carId = retrieveCarId();

		const car = await getCarByIdAxios(carId);
		populateEditCarForm(car);
	});

	const buttonAddCarAxios = document.getElementById("addAxios");
	buttonAddCarAxios.addEventListener("click", async (event) => {
		event.stopPropagation();
		event.preventDefault();
		const car = retrieveCarForm();

		await addCarAxios(car);
		cleanTable("cars-table");
		const newCars = await getAllCarsAxios();
		addCarRows(newCars.data, "cars-table");
	});
	const buttonDeleteCarAxios = document.getElementById("deletecarAxios");
	buttonDeleteCarAxios.addEventListener("click", async (event) => {
		event.stopPropagation();
		const carId = retrieveCarId();

		await deleteCarByIdAxios(carId);
		const newCars = await getAllCarsAxios();
		cleanTable("cars-table");
		addCarRows(newCars.data, "cars-table");
	});
});
