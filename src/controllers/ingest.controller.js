import { validateTelemetry } from "../validations/telemetry.validation.js";
import { ingest } from "../services/ingest.service.js";

export async function ingestTelemetry(req, res) {
  try {
    validateTelemetry(req.body);
    await ingest(req.body);
    res.status(201).json({ status: "ok" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
