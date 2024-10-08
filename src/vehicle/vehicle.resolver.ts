import { Args, Query, Resolver } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import {
  JsonExportType,
  MakesResponse,
  VehicleTypesForMakeIdResponse,
} from './vehicle.types';

@Resolver()
export class VehicleResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  @Query(() => MakesResponse)
  async getMakes(): Promise<MakesResponse> {
    const response = await this.vehicleService.getMakes();
    return response;
  }

  @Query(() => VehicleTypesForMakeIdResponse)
  getVehicleTypesForMakeId(
    @Args('makeId') makeId: string,
  ): Promise<VehicleTypesForMakeIdResponse> {
    return this.vehicleService.getVehicleTypesForMakeId(makeId);
  }

  @Query(() => [JsonExportType])
  async exportJson(): Promise<JsonExportType[]> {
    return this.vehicleService.exportJson();
  }
}
