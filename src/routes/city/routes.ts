import { Router } from "express";
import { CityService } from "../../core/city/service";

const router = Router();
const cityService = new CityService();

router.get("/cities", async (req, res) => {
	const { query } = req.query;
	const cities = await cityService.getAllCitiesByQuery(query as string);
	res.json(cities);
});

export { router as cityRoutes };
