import { Router, Request, Response } from "express";
import {
  getOwnTodos,
  getUserTodos,
  newTodo,
} from "../controllers/todoControllers";
import { protect } from "../middleware/authMiddleware";
const router = Router();
router.post("/", protect, newTodo);
router.get("/me", protect, getOwnTodos);
router.get("/:username", getUserTodos);
export default router;
