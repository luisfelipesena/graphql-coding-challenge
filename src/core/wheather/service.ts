import type { ApiResponse } from "../../common/types";
import { WheatherApiClient } from "./client";
import type { Wheather, WheatherDto } from "./types";

export class WheatherApiService {
	private readonly client: WheatherApiClient;

	constructor() {
		this.client = new WheatherApiClient();
	}

	async getWheatherByParams(city: string, lat: string, lon: string): Promise<ApiResponse<Wheather>> {
		try {
			const data = city ? await this.client.getWheatherByCity(city) : await this.client.getWheatherByCoordinates(Number(lat), Number(lon));
			const parsedWheather = this.parseWheather(data);
			return {
				success: true,
				message: "Wheather fetched successfully",
				data: parsedWheather,
			};
		} catch (error) {
			return {
				success: false,
				message: "Error fetching wheather",
				error: error,
			};
		}
	}

	async getWheatherByCoordinates(
		lat: number,
		lon: number,
	): Promise<ApiResponse<Wheather>> {
		try {
			const data = await this.client.getWheatherByCoordinates(lat, lon);
			const parsedWheather = this.parseWheather(data);
			return {
				success: true,
				message: "Wheather fetched successfully",
				data: parsedWheather,
			};
		} catch (error) {
			return {
				success: false,
				message: "Error fetching wheather",
				error: error,
			};
		}
	}

	parseWheather(wheather: WheatherDto): Wheather {
		return {
			latitude: wheather.location.lat,
			longitude: wheather.location.lon,
			temperature: wheather.current.temp_c,
			condition: wheather.current.condition.text,
			windSpeed: wheather.current.wind_kph,
			windDirection: wheather.current.wind_dir,
			humidity: wheather.current.humidity,
			cloudCover: wheather.current.cloud,
			visibility: wheather.current.vis_km,
			name: wheather.location.name,
			region: wheather.location.region,
			country: wheather.location.country,
		};
	}
}
