import axios from "axios";

export class MakesClient {
	private readonly baseUrl = "https://vpic.nhtsa.dot.gov/api";

	async getAllMakes(): Promise<any> {
		const response = await axios.get(`${this.baseUrl}/vehicles/getallmakes`, {
			params: {
				format: "XML",
			},
		});

		return response.data;
	}
}
