import { Router, Request, Response } from "express";
import { loginUser, registerUser } from "../controllers/userController";
const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
export default router;
