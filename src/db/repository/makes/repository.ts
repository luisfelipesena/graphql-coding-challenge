import { eq } from "drizzle-orm";
import type { Make } from "../../../core/makes/types";
import { db } from "../../database";
import { makes } from "../../schemas/makes/schema";

export class MakesRepository {
	private static instance: MakesRepository | null = null;

	private constructor() {}

	public static getInstance(): MakesRepository {
		if (!MakesRepository.instance) {
			MakesRepository.instance = new MakesRepository();
		}
		return MakesRepository.instance;
	}

	async create(makesParams: Make): Promise<Make> {
		const [newMake] = await db
			.insert(makes)
			.values(makesParams)
			.onConflictDoNothing()
			.returning();
		return newMake;
	}

	async get(id: number): Promise<Make | null> {
		const [make] = await db.select().from(makes).where(eq(makes.id, id));
		return make || null;
	}

	async getAll(): Promise<Make[]> {
		return await db.select().from(makes);
	}
}
