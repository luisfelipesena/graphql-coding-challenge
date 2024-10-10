import { Query, Resolver } from "type-graphql";
import { ApiResponse } from "../../../common/types";
import { MakesService } from "../../../core/makes/service";
import { Make } from "../../../core/makes/types";

@Resolver()
export class MakesResolver {
	private makesService: MakesService;

	constructor() {
		this.makesService = new MakesService();
	}

	@Query(() => [Make])
	async getAllMakes(): Promise<Make[]> {
		const makesResponse = await this.makesService.getAllMakes();
		if (!makesResponse.success) {
			throw new Error(makesResponse.message);
		}

		return makesResponse.data ?? [];
	}
}
