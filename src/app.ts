import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { env } from "./config/env";
import { SeedService } from "./db/seed/seed";
import { getSchema } from "./graphql/schema";

const PORT = Number(env.PORT) || 3000;
const seedService = new SeedService();

async function startApolloServer() {
	seedService.seed().catch((error) => {
		console.error({ error });
	});

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
