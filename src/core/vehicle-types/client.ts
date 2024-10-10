import axios, { type AxiosInstance } from "axios";

export class VehicleTypesClient {
	private readonly axiosInstance: AxiosInstance;

	constructor() {
		this.axiosInstance = axios.create();
	}

	async getAllVehicleTypesByMakeId(makeId: number): Promise<string> {
		const response = await this.axiosInstance.get(
			`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`,
		);
		return response.data;
	}
}
