const express = require("express"),
	fs = require("fs"),
	path = require("path"),
	dataFile = "/data/cars.json",
	router = express.Router();

const getNextAvailableId = (allCars) => {
	const carIds = allCars.map((c) => c.car_id);
	const maxValue = Math.max(...carIds);
	return maxValue + 1;
};

const saveCarData = (data) =>
	fs.writeFile(
		path.join(__dirname + dataFile),
		JSON.stringify(data, null, 4),
		(err) => {
			if (err) {
				console.log(err);
			}
		}
	);

const getCarData = () =>
	JSON.parse(fs.readFileSync(path.join(__dirname + dataFile), "utf8"));

const getCar = (id) => {
	const cars = getCarData();
	const car = cars.find((item) => parseInt(item.car_id) === parseInt(id));
	return car;
};

const addCar = (car) => {
	const data = getCarData();
	const nextId = getNextAvailableId(data);
	const newCar = {
		car_id: nextId,
		name: car.name,
		brand: car.brand,
		year_release: car.year_release,
	};
	data.push(newCar);
	saveCarData(data);
};

const deleteCarApi = (idCar) => {
	console.log(idCar);
	var data = getCarData();
	var pos = data.map((e) => e.car_id).indexOf(parseInt(idCar, 10));

	if (pos > -1) {
		data.splice(pos, 1);
	} else {
		console.log("Error 404, Car not found");
	}

	saveCarData(data);
};

router
	.route("/")
	.get((_, res) => {
		const data = getCarData();
		res.send(data);
	})
	.post((req, res) => {
		const data = getCarData();
		const nextId = getNextAvailableId(data);
		const newCar = {
			car_id: nextId,
			name: req.body.name,
			brand: req.body.brand,
			year_release: req.body.year_release,
		};
		data.push(newCar);
		saveCarData(data);

		res.status(201).send(newCar);
	});

/* GET, PUT and DELETE individual cars */
router
	.route("/:id")
	.get((req, res) => {
		var data = getCarData();
		var matchingCar = data.find(
			(item) => parseInt(item.car_id) === +parseInt(req.params.id)
		);

		if (!matchingCar) {
			res.sendStatus(404);
		} else {
			res.send(matchingCar);
		}
	})
	.delete((req, res) => {
		var data = getCarData();
		var pos = data.map((e) => e.car_id).indexOf(parseInt(req.params.id, 10));

		if (pos > -1) {
			data.splice(pos, 1);
		} else {
			res.sendStatus(404);
		}

		saveCarData(data);
		res.sendStatus(204);
	})
	.put((req, res) => {
		var data = getCarData();
		var matchingCar = data.find(
			(item) => parseInt(item.car_id) === parseInt(req.params.id)
		);

		if (!matchingCar) {
			res.sendStatus(404);
		} else {
			matchingCar.name = req.body.name;
			matchingCar.brand = req.body.brand;
			matchingCar.year_release = req.body.year_release;

			saveCarData(data);
			res.sendStatus(204);
			res.send(matchingCar);
		}
	});

// module.exports = router;
// module.exports = getCarData;
// module.exports = getCar;
// module.exports = saveCarData;
module.exports = {
	router,
	getCarData,
	getCar,
	addCar,
	deleteCarApi,
};
