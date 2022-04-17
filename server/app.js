import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
const morgan = require("morgan");
import { config } from "dotenv";
config();

// create express app
const app = express();

// db connection
mongoose
	.connect(process.env.MONGO_URI, {})
	.then(() => console.log("-- DB connected --"))
	.catch((err) => console.log(`DB connection error => ${err}`));

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
readdirSync("./routes").map((route) => {
	return app.use("/api", require(`./routes/${route}`));
});

// port
const port = process.env.PORT || 8080;

// listener
app.listen(port, () => console.log(`Server is running on port ${port}`));
