import * as meterRepo from "../repositories/meter.repo.js";
import * as vehicleRepo from "../repositories/vehicle.repo.js";

export async function ingest(data) {
  if (data.type === "meter") {
    await meterRepo.insertHistory(data);
    await meterRepo.upsertLive(data);
  }

  if (data.type === "vehicle") {
    await vehicleRepo.insertHistory(data);
    await vehicleRepo.upsertLive(data);
  }
}
