import { Arg, Int, Query, Resolver } from "type-graphql";
import { OutputService } from "../../../core/output/service";
import { OutputItem } from "../../../core/output/types";

@Resolver()
export class OutputResolver {
	private outputService: OutputService;

	constructor() {
		this.outputService = OutputService.getInstance();
	}

	@Query(() => [OutputItem])
	async getAllMakesWithVehicleTypes(): Promise<OutputItem[]> {
		return await this.outputService.getAllMakesWithVehicleTypes();
	}

	@Query(() => OutputItem, { nullable: true })
	async getMakeWithVehicleTypes(
		@Arg("makeId", () => Int) makeId: number,
	): Promise<OutputItem | null> {
		return await this.outputService.getMakeWithVehicleTypes(makeId);
	}
}
