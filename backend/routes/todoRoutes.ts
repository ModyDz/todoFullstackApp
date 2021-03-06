import { Router, Request, Response } from "express";
import {
  getOwnTodos,
  getUserTodos,
  newTodo,
  removeTodo,
  toggleTodo,
} from "../controllers/todoControllers";
import { protect } from "../middleware/authMiddleware";
const router = Router();
router.post("/", protect, newTodo);
router.get("/me", protect, getOwnTodos);
router.get("/:username", getUserTodos);
router.put("/:id", protect, toggleTodo);
router.delete("/:id", protect, removeTodo);
export default router;
