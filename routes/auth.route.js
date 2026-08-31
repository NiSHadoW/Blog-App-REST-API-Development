import { Router } from "express";
import { signUp, login } from "../controller/auth.controller.js";

const router = Router();

router.post("/auth/register", signUp);//to register users
router.post("/auth/login", login);// to login any user

export default router;
