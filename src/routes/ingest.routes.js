import { Router } from "express";
import { ingestTelemetry } from "../controllers/ingest.controller.js";

const router = Router();
router.post("/", ingestTelemetry);
export default router;
