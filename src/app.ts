import express from "express";
import { env } from "./config/env";
import { wheatherRoutes } from "./routes/wheather/routes";
import { cityRoutes } from "./routes/city/routes";
import cors from "cors";

const PORT = env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use(wheatherRoutes);
app.use(cityRoutes);

app.listen(PORT, () => {
	return console.log(`Express is listening at http://localhost:${PORT}`);
});
