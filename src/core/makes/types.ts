import { Field, Int, ObjectType } from "type-graphql";
import { VehicleType } from "../../core/vehicle-types/types";

@ObjectType()
export class Make {
	@Field(() => Int)
	id!: number;

	@Field()
	name!: string;
}

export interface MakesResponse {
	count: number;
	message: string;
	results: Make[];
}
