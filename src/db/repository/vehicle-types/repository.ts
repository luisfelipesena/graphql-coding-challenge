import { eq } from "drizzle-orm";
import { vehicleTypes } from "../../schemas/vehicle-types/schema";
import { VehicleType } from "../../../core/vehicle-types/types";
import { db } from "../../database";

export class VehicleTypesRepository {
	async create(name: string, makeId: number): Promise<VehicleType> {
		const [newVehicleType] = await db
			.insert(vehicleTypes)
			.values({ name, makeId })
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
}
