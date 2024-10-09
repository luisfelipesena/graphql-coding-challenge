import { env } from "../../config/env";
import type { CityDto } from "./types";

export class CityClient {
	private readonly apiKey = env.API_NINJA_KEY;

	async getAllCitiesByQuery(query: string): Promise<CityDto[]> {
		const response = await fetch(
			`https://api.api-ninjas.com/v1/city?name=${query}&limit=30`,
			{
				headers: {
					"X-Api-Key": this.apiKey,
				},
			},
		);

		const data = await response.json();
		return data;
	}
}
