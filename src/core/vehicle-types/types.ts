import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class VehicleType {
	@Field(() => Int)
	id!: number;

	@Field()
	name!: string;
}

export interface VehicleTypesResponse {
	count: number;
	message: string;
	results: VehicleType[];
}
