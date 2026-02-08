import { Router } from "express";
import { getPerformance } from "../controllers/analytics.controller.js";

const router = Router();
router.get("/performance/:vehicleId", getPerformance);
export default router;
