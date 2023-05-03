import { Router } from "express";
import { checkSession } from "../middlewares/session";

import authRoutes from "./auth";
import profileRoutes from "./profile";

const router = Router();

router.use("/auth", authRoutes);
router.use("/profile", checkSession, profileRoutes);

export default router;
