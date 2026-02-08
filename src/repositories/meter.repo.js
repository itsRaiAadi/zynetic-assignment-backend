import { pool } from "../config/db.js";

export async function insertHistory(data) {
  await pool.query(
    `INSERT INTO meter_readings (meter_id, kwh_consumed_ac, voltage, timestamp)
     VALUES ($1, $2, $3, $4)`,
    [data.meterId, data.kwhConsumedAc, data.voltage, data.timestamp],
  );
}

export async function upsertLive(data) {
  await pool.query(
    `INSERT INTO meter_live_status
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (meter_id)
     DO UPDATE SET
       last_kwh_consumed_ac = EXCLUDED.last_kwh_consumed_ac,
       last_voltage = EXCLUDED.last_voltage,
       last_updated = EXCLUDED.last_updated`,
    [data.meterId, data.kwhConsumedAc, data.voltage, data.timestamp],
  );
}
