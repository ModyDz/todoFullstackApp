import { Router, Request, Response } from "express";
import { newTodo } from "../controllers/todoControllers";
const router = Router();
router.post("/", newTodo);
export default router;
