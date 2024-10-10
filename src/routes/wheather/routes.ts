import { Router } from "express";
import { WheatherApiService } from "../../core/wheather/service";

const router = Router();
const wheatherApiService = new WheatherApiService();

router.get("/wheather", async (req, res) => {
	const { city, lat, lon } = req.query;
	const wheather = await wheatherApiService.getWheatherByParams(
		city as string,
		lat as string,
		lon as string,
	);
	res.json(wheather);
});

export { router as wheatherRoutes };
