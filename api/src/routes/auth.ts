import { Router } from "express";
import { validateSigIn } from "../validators/auth";
import * as userControllers from "../controllers/auth";

const router = Router();

router
  .post("/signin", validateSigIn, userControllers.registerNewUser)
  .post("/login", userControllers.loginUser);

export default router;
