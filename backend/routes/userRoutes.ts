import { Router, Request, Response } from "express";
import {
  loginUser,
  registerUser,
  searchUser,
} from "../controllers/userController";
const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/search", searchUser);
export default router;
