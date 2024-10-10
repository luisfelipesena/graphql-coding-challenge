import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { env } from "./config/env";
import { getSchema } from "./graphql/schema";

const PORT = Number(env.PORT) || 3000;

async function startApolloServer() {
	const schema = await getSchema();

	const server = new ApolloServer({
		schema,
	});

	const { url } = await startStandaloneServer(server, {
		listen: { port: PORT },
	});

	console.log(`🚀  Server ready at: ${url}`);
}

startApolloServer();
