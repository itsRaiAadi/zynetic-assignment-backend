import { fetchPerformance } from "../services/analytics.service.js";

export async function getPerformance(req, res) {
  const data = await fetchPerformance(req.params.vehicleId);
  res.json(data);
}
