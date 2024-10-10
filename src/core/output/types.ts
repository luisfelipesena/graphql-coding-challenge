import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class VehicleTypeOutput {
	@Field(() => Int)
	typeId!: number;

	@Field()
	typeName!: string;
}

@ObjectType()
export class OutputItem {
	@Field(() => Int)
	makeId!: number;

	@Field()
	makeName!: string;

	@Field(() => [VehicleTypeOutput])
	vehicleTypes!: VehicleTypeOutput[];
}

@ObjectType()
export class OutputResponse {
	@Field(() => [OutputItem])
	results!: OutputItem[];
}
