import type { ApiResponse } from "../../common/types";
import { CityClient } from "./client";
import type { City, CityDto } from "./types";

export class CityService {
	private readonly client = new CityClient();

	async getAllCitiesByQuery(query: string): Promise<ApiResponse<City[]>> {
		try {
			const data = await this.client.getAllCitiesByQuery(query);
			const parsedCities = this.parseCities(data);
			return {
				success: true,
				message: "Cities fetched successfully",
				data: parsedCities,
			};
		} catch (error) {
			return {
				success: false,
				message: "Error fetching cities",
				error: error,
			};
		}
	}

	parseCities(cities: CityDto[]): City[] {
		return cities.map((city) => ({
			...city,
			isCapital: city.is_capital,
		}));
	}
}
