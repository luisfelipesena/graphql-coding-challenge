import dotenv from "dotenv";
dotenv.config();

export const env = {
	PORT: process.env.PORT || 3001,
	DATABASE_URL: process.env.DATABASE_URL,
};
