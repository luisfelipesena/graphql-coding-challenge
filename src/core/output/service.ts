import { VehicleTypesRepository } from "../../db/repository/vehicle-types/repository";
import type { OutputItem } from "./types";

export class OutputService {
	private vehicleTypesRepository: VehicleTypesRepository =
		VehicleTypesRepository.getInstance();

	private static instance: OutputService | null = null;

	private constructor() {
		this.vehicleTypesRepository = VehicleTypesRepository.getInstance();
	}

	public static getInstance(): OutputService {
		if (!OutputService.instance) {
			OutputService.instance = new OutputService();
		}
		return OutputService.instance;
	}

	async getAllMakesWithVehicleTypes(): Promise<OutputItem[]> {
		return await this.vehicleTypesRepository.getOutputItems();
	}

	async getMakeWithVehicleTypes(makeId: number): Promise<OutputItem | null> {
		const vehicleTypes =
			await this.vehicleTypesRepository.getOutputItem(makeId);
		return vehicleTypes;
	}
}
