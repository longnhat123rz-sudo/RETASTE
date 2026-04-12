import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import {
  login,
  register,
  registerAdmin,
  registerStaff,
  updateProfile,
  checkEmailAvailability,
} from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/register/admin", registerAdmin);
router.post("/register/staff", registerStaff);
router.post("/login", login);
router.put("/profile", verifyToken, updateProfile);
router.post("/check-email", checkEmailAvailability);

export default router;
