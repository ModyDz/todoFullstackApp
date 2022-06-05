"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;
app.use("/api/user", userRoutes_1.default);
app.use("/api/todo", todoRoutes_1.default);
if (process.env.NODE_ENV) {
    app.use(express_1.default.static(path_1.default.join(__dirname, "../front/dist")));
    app.get("*", (req, res) => res.sendFile(path_1.default.resolve(__dirname, "../", "front", "dist", "index.html")));
}
app.use(errorMiddleware_1.errorHandler);
(0, db_1.connectDB)(process.env.MONGO_URI || "");
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
