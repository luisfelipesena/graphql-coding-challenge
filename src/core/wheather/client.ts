import { env } from "../../config/env";
import type { WheatherDto } from "./types";

export class WheatherApiClient {
	private readonly apiKey = env.WEATHER_API_KEY;

	async getWheatherByCity(city: string): Promise<WheatherDto> {
		const response = await fetch(
			`http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}`,
		);
		const data = (await response.json()) as WheatherDto;
		return data;
	}

	async getWheatherByCoordinates(
		lat: number,
		lon: number,
	): Promise<WheatherDto> {
		const response = await fetch(
			`http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${lat},${lon}`,
		);
		const data = (await response.json()) as WheatherDto;
		return data;
	}
}
