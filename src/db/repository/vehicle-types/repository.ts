import { eq } from "drizzle-orm";
import type { OutputItem } from "../../../core/output/types";
import type { VehicleType } from "../../../core/vehicle-types/types";
import { db } from "../../database";
import { makes } from "../../schemas/makes/schema";
import { vehicleTypes } from "../../schemas/vehicle-types/schema";

export class VehicleTypesRepository {
	private static instance: VehicleTypesRepository | null = null;

	private constructor() {}

	public static getInstance(): VehicleTypesRepository {
		if (!VehicleTypesRepository.instance) {
			VehicleTypesRepository.instance = new VehicleTypesRepository();
		}
		return VehicleTypesRepository.instance;
	}

	async create(
		vehicleTypesParams: VehicleType,
		makeId: number,
	): Promise<VehicleType> {
		const [newVehicleType] = await db
			.insert(vehicleTypes)
			.values({ ...vehicleTypesParams, makeId })
			.onConflictDoNothing()
			.returning();
		return newVehicleType;
	}

	async get(id: number): Promise<VehicleType | null> {
		const [vehicleType] = await db
			.select()
			.from(vehicleTypes)
			.where(eq(vehicleTypes.id, id));
		return vehicleType || null;
	}

	async getAll(): Promise<VehicleType[]> {
		return await db.select().from(vehicleTypes);
	}

	async getOutputItems(): Promise<OutputItem[]> {
		const result = await db
			.select({
				makeId: makes.id,
				makeName: makes.name,
				typeId: vehicleTypes.id,
				typeName: vehicleTypes.name,
			})
			.from(vehicleTypes)
			.innerJoin(makes, eq(vehicleTypes.makeId, makes.id));

		const groupedResult = result.reduce((acc, curr) => {
			const existingMake = acc.find((item) => item.makeId === curr.makeId);
			if (existingMake) {
				existingMake.vehicleTypes.push({
					typeId: curr.typeId,
					typeName: curr.typeName,
				});
			} else {
				acc.push({
					makeId: curr.makeId,
					makeName: curr.makeName,
					vehicleTypes: [
						{
							typeId: curr.typeId,
							typeName: curr.typeName,
						},
					],
				});
			}
			return acc;
		}, [] as OutputItem[]);

		return groupedResult;
	}

	async getOutputItem(makeId: number): Promise<OutputItem | null> {
		const result = await db
			.select({
				makeId: makes.id,
				makeName: makes.name,
				typeId: vehicleTypes.id,
				typeName: vehicleTypes.name,
			})
			.from(vehicleTypes)
			.innerJoin(makes, eq(vehicleTypes.makeId, makes.id))
			.where(eq(vehicleTypes.makeId, makeId));

		if (result.length === 0) {
			return null;
		}

		const outputItem: OutputItem = {
			makeId: result[0].makeId,
			makeName: result[0].makeName,
			vehicleTypes: result.map((item) => ({
				typeId: item.typeId,
				typeName: item.typeName,
			})),
		};

		return outputItem;
	}
}
