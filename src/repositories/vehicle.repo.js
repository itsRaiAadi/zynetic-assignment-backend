import { pool } from "../config/db.js";

export async function insertHistory(data) {
  await pool.query(
    `INSERT INTO vehicle_readings
     (vehicle_id, soc, kwh_delivered_dc, battery_temp, timestamp)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      data.vehicleId,
      data.soc,
      data.kwhDeliveredDc,
      data.batteryTemp,
      data.timestamp,
    ],
  );
}

export async function upsertLive(data) {
  await pool.query(
    `INSERT INTO vehicle_live_status
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (vehicle_id)
     DO UPDATE SET
       soc = EXCLUDED.soc,
       last_kwh_delivered_dc = EXCLUDED.last_kwh_delivered_dc,
       battery_temp = EXCLUDED.battery_temp,
       last_updated = EXCLUDED.last_updated`,
    [
      data.vehicleId,
      data.soc,
      data.kwhDeliveredDc,
      data.batteryTemp,
      data.timestamp,
    ],
  );
}
