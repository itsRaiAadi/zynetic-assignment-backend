import { pool } from "../config/db.js";

export async function fetchPerformance(vehicleId) {
  const result = await pool.query(
    `
    SELECT
      SUM(m.kwh_consumed_ac) AS total_ac,
      SUM(v.kwh_delivered_dc) AS total_dc,
      AVG(v.battery_temp) AS avg_battery_temp
    FROM vehicle_readings v
    JOIN meter_readings m
      ON m.timestamp = v.timestamp
    WHERE v.vehicle_id = $1
      AND v.timestamp >= NOW() - INTERVAL '24 HOURS'
    `,
    [vehicleId],
  );

  const row = result.rows[0];
  return {
    totalAc: row.total_ac,
    totalDc: row.total_dc,
    efficiency: row.total_dc / row.total_ac,
    avgBatteryTemp: row.avg_battery_temp,
  };
}
