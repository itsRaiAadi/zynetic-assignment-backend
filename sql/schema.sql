-- ===============================
-- COLD STORAGE (HISTORICAL DATA)
-- ===============================

CREATE TABLE meter_readings (
  id BIGSERIAL PRIMARY KEY,
  meter_id VARCHAR(50) NOT NULL,
  kwh_consumed_ac NUMERIC NOT NULL,
  voltage NUMERIC NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_meter_readings_meter_time
ON meter_readings (meter_id, timestamp DESC);

CREATE TABLE vehicle_readings (
  id BIGSERIAL PRIMARY KEY,
  vehicle_id VARCHAR(50) NOT NULL,
  soc INT NOT NULL,
  kwh_delivered_dc NUMERIC NOT NULL,
  battery_temp NUMERIC NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_vehicle_readings_vehicle_time
ON vehicle_readings (vehicle_id, timestamp DESC);

-- ===============================
-- HOT STORAGE (LIVE STATE)
-- ===============================

CREATE TABLE meter_live_status (
  meter_id VARCHAR(50) PRIMARY KEY,
  last_kwh_consumed_ac NUMERIC NOT NULL,
  last_voltage NUMERIC NOT NULL,
  last_updated TIMESTAMPTZ NOT NULL
);

CREATE TABLE vehicle_live_status (
  vehicle_id VARCHAR(50) PRIMARY KEY,
  soc INT NOT NULL,
  last_kwh_delivered_dc NUMERIC NOT NULL,
  battery_temp NUMERIC NOT NULL,
  last_updated TIMESTAMPTZ NOT NULL
);
