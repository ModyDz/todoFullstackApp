import { Router, Request, Response } from "express";
import { registerUser } from "../controllers/userController";
const router = Router();
router.post("/register", registerUser);
export default router;
