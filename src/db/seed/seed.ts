import { MakesService } from "../../core/makes/service";
import { VehicleTypesService } from "../../core/vehicle-types/service";
import { MakesRepository } from "../repository/makes/repository";
import { VehicleTypesRepository } from "../repository/vehicle-types/repository";

export class SeedService {
	private makesService = MakesService.getInstance();
	private makesRepository = MakesRepository.getInstance();

	private vehicleTypesService = VehicleTypesService.getInstance();
	private vehicleTypesRepository = VehicleTypesRepository.getInstance();

	async seed() {
		console.log("Seeding...");
		const makesResponse = await this.makesService.getAllMakes();
		if (!makesResponse.success) {
			throw new Error(makesResponse.message);
		}

		for (const make of makesResponse.data ?? []) {
			await this.makesRepository.create(make);
			const vehicleTypesResponse =
				await this.vehicleTypesService.getAllVehicleTypesByMakeId(make.id);
			if (!vehicleTypesResponse.success) {
				throw new Error(vehicleTypesResponse.message);
			}

			for (const vehicleType of vehicleTypesResponse.data ?? []) {
				await this.vehicleTypesRepository.create(vehicleType, make.id);
			}
		}
		console.log("Seeding finished");
	}
}
