const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Car {
		car_id: Int!
		name: String!
		brand: String!
		year_release: String!
	}

	type Query {
		cars: [Car!]!
		car(id: ID!): Car!
	}

	input NewCar {
		car_id: Int
		name: String!
		brand: String!
		year_release: String!
	}

	type Mutation {
		addCar(newCar: NewCar!): Boolean
		deleteCar(car_id: Int!): Boolean
	}
`;

module.exports = typeDefs;
