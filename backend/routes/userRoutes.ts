import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  getUser,
  loginUser,
  registerUser,
  searchUsers,
  uploadUserPicture,
} from "../controllers/userController";
const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/upload", protect, uploadUserPicture);
router.get("/search", searchUsers);
router.get("/:username", getUser);
export default router;
