import type { ApiResponse } from "../../common/types";
import { XmlService } from "../../common/xml/service";
import { MakesClient } from "./client";
import type { Make } from "./types";

export class MakesService {
	private readonly client: MakesClient;
	private readonly xmlService: XmlService;
	private static instance: MakesService | null = null;

	private constructor() {
		this.client = new MakesClient();
		this.xmlService = XmlService.getInstance();
	}

	public static getInstance(): MakesService {
		if (!MakesService.instance) {
			MakesService.instance = new MakesService();
		}
		return MakesService.instance;
	}

	async getAllMakes(): Promise<ApiResponse<Make[]>> {
		try {
			const xmlData = await this.client.getAllMakes();
			const parsedData = await this.xmlService.parseXml(xmlData);
			const makes = this.parseMakes(parsedData);

			return {
				success: true,
				message: "Makes fetched successfully",
				data: makes,
			};
		} catch (error: any) {
			return {
				success: false,
				message: error.message || "Error fetching makes",
			};
		}
	}

	private parseMakes(data: any): Make[] {
		const results = data.Response.Results[0].AllVehicleMakes;
		return (
			results?.map((make: any) => {
				return {
					id: Number.parseInt(make.Make_ID[0]),
					name: make.Make_Name[0],
				};
			}) ?? []
		);
	}
}
