const express = require("express"),
	path = require("path"),
	cookieParser = require("cookie-parser"),
	bodyParser = require("body-parser"),
	cors = require("cors"),
	expressjwt = require("express-jwt");

const users = require("./routes/users");
const cars = require("./routes/cars");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/type-defs");

const app = express();

// setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
const corsOptions = {
	origin: "http://localhost:1234",
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
const jwtCheck = expressjwt({
	secret: "mysupersecretkey",
	algorithms: ["HS256"],
});

app.use("/api/users", jwtCheck, users);
app.use("/api/cars", jwtCheck, cars.router);

const graphqlServer = new ApolloServer({
	typeDefs,
	resolvers,
});
graphqlServer.applyMiddleware({ app });

app.set("port", process.env.PORT || 3050);
app.listen(app.get("port"));

console.log("Listening on port: " + app.get("port"));
console.log(
	"GraphQL server listening on: http://localhost:" +
		app.get("port") +
		"/graphql"
);

module.exports = app;
