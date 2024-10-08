import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MakesResponse {
  @Field()
  count: number;

  @Field()
  message: string;

  @Field(() => [Make])
  results: Make[];
}

@ObjectType()
export class Make {
  @Field()
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class VehicleTypesForMakeIdResponse {
  @Field()
  count: number;

  @Field()
  message: string;

  @Field(() => [VehicleType])
  results: VehicleType[];
}

@ObjectType()
export class VehicleType {
  @Field()
  typeId: number;

  @Field()
  typeName: string;
}

@ObjectType()
export class JsonExportType {
  @Field()
  makeId: number;

  @Field()
  makeName: string;

  @Field(() => [VehicleType])
  vehicleTypes: VehicleType[];
}
