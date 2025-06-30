import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import financialRecordRouter from "./routes/financial-records.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Connect to database
const MONGO_DATABASE = process.env.MONGO_DATABASE;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_CLUSTER = process.env.MONGO_CLUSTER;
mongoose
  .connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DATABASE}`)
  .then(() => console.log("Connected to MongoDB."))
  .catch((error) => console.log(`Failed to connect to MongoDB: ${error}.`));

app.use("/api/v1/financial-records", financialRecordRouter);

// Start the server
app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port}.`);
    return;
  }
  console.log(`Server cannot start: ${error}.`);
});
