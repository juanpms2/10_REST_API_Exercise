# GraphQL

Para este ejercicio se han instalado las siguientes librerías en el `server` de datos:

       - npm install apollo-server-express graphql-request --save

Y la siguiente librería en el `cliente`

       - npm install graphql-request --save

#### El ejercicio está realizado en Node y Vanilla JavaScript. Se mantienen las consultas `fetch` para comparar con las de `graphQL`.

Se ha añadido un botón `Delete` utilizando GraphQL.

## Type defs

```javascript
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
```

## Resolvers

```javascript
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
```

## Puesta en marcha

- ### `npm install` en el cliente y en cada uno de los servidores.
- ### Una vez instalado, desde el raíz principal hacer un `npm start` que arrancará tanto el cliente como los servidores.
