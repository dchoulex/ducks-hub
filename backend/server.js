// Import dependencies
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const envFilePath = path.resolve(__dirname, ".env")
dotenv.config({ path: envFilePath});

// Import app 
import app from "./app.js";

const database = process.env.DATABASE_URL.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(database).then(() => {
  console.log("DB connection successful!")
});

// start node server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App UI available http://localhost:${port}`);
});