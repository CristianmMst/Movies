import { Router } from "express";
import * as profileController from "../controllers/profile";

const router = Router();

router
  .get("/", profileController.getUserData)
  .post("/movies", profileController.createMovie)
  .delete("/movies/:id", profileController.deteleMovie);

export default router;
