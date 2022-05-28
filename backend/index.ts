import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;
app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);
app.use(errorHandler);
connectDB(process.env.MONGO_URI || "");
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
