import { Router } from "express";
import {
  getUsers,
  getProfile,
  updateProfile,
  updatePassword,
  getUser,
  updateStatus,
} from "../controller/users.controller.js";
import authMiddleWare, { isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/users", authMiddleWare, isAdmin, getUsers);
router.get("/users/profile", authMiddleWare, getProfile);
router.put("/users/profile/update", authMiddleWare, updateProfile);
router.patch("/users/password", authMiddleWare, updatePassword);
router.get("/users/:id", authMiddleWare, isAdmin, getUser);
router.patch("/users/:id/status", authMiddleWare, isAdmin, updateStatus);

export default router;
