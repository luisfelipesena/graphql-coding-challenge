import type { ApiResponse } from "../../common/types";
import { XmlService } from "../../common/xml/service";
import { VehicleTypesClient } from "./client";
import type { VehicleType } from "./types";

export class VehicleTypesService {
	private readonly client: VehicleTypesClient;
	private readonly xmlService: XmlService;

	constructor() {
		this.client = new VehicleTypesClient();
		this.xmlService = XmlService.getInstance();
	}

	async getAllVehicleTypesByMakeId(
		makeId: number,
	): Promise<ApiResponse<VehicleType[]>> {
		try {
			const xmlData = await this.client.getAllVehicleTypesByMakeId(makeId);
			const parsedData = await this.xmlService.parseXml(xmlData);
			const vehicleTypes = this.parseVehicleTypes(parsedData);

			return {
				success: true,
				message: "Vehicle types fetched successfully",
				data: vehicleTypes,
			};
		} catch (error: any) {
			return {
				success: false,
				message: error.message || "Failed to fetch vehicle types",
			};
		}
	}

	private parseVehicleTypes(data: any): VehicleType[] {
		const results = data.Response.Results[0].VehicleTypesForMakeIds;
		return results.map((vehicleType: any) => ({
			id: Number.parseInt(vehicleType.VehicleTypeId[0]),
			name: vehicleType.VehicleTypeName[0],
		}));
	}
}
