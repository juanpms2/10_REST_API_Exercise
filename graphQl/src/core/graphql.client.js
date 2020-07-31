import { GraphQLClient } from "graphql-request";

// TODO: move to env variable
const url = "http://localhost:3050/graphql";

export const graphQLClient = new GraphQLClient(url);
