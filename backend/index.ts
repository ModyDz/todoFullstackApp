import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
import cors from "cors";
import path from "path";
const app: Express = express();

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;
app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);
if (process.env.NODE_ENV) {
  app.use(express.static(path.join(__dirname, "../front/dist")));
  app.get("*", (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, "../", "front", "dist", "index.html"))
  );
}

app.use(errorHandler);
connectDB(process.env.MONGO_URI || "");
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
