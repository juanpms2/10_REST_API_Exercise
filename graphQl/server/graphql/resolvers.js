const { getCar, getCarData, addCar, deleteCarApi } = require("../routes/cars");

const resolvers = {
	Query: {
		cars: () => {
			const cars = getCarData();
			return cars;
		},
		car: (parent, args) => {
			const car = getCar(parseInt(args.id));
			return car;
		},
	},
	Mutation: {
		addCar: (parent, args) => {
			addCar(args.newCar);
			return true;
		},
		deleteCar: (parent, args) => {
			deleteCarApi(parseInt(args.car_id));
			return true;
		},
	},
};

module.exports = resolvers;
