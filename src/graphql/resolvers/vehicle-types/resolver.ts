import { Arg, Query, Resolver } from "type-graphql";
import { VehicleTypesService } from "../../../core/vehicle-types/service";
import { VehicleType } from "../../../core/vehicle-types/types";

@Resolver()
export class VehicleTypesResolver {
	private readonly vehicleTypesService: VehicleTypesService;

	constructor() {
		this.vehicleTypesService = new VehicleTypesService();
	}

	@Query(() => [VehicleType])
	async getVehicleTypesByMakeId(
		@Arg("makeId") makeId: number,
	): Promise<VehicleType[]> {
		const vehicleTypesResponse =
			await this.vehicleTypesService.getAllVehicleTypesByMakeId(makeId);
		if (!vehicleTypesResponse.success) {
			throw new Error(vehicleTypesResponse.message);
		}

		return vehicleTypesResponse.data ?? [];
	}
}
