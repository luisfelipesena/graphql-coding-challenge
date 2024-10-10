import { buildSchema } from "type-graphql";
import { ResolverFactory } from "./resolvers/factory";

const getSchema = async () => {
	const schema = await buildSchema({
		resolvers: ResolverFactory.createResolvers(),
	});
	return schema;
};

export { getSchema };
