import { eq } from "drizzle-orm";
import { makes } from "../../schemas/makes/schema";
import { Make } from "../../../core/makes/types";
import { db } from "../../database";

export class MakesRepository {
	async create(name: string): Promise<Make> {
		const [newMake] = await db
			.insert(makes)
			.values({ name })
			.returning();
		return newMake;
	}

	async get(id: number): Promise<Make | null> {
		const [make] = await db
			.select()
			.from(makes)
			.where(eq(makes.id, id));
		return make || null;
	}

	async getAll(): Promise<Make[]> {
		return await db.select().from(makes);
	}
}
