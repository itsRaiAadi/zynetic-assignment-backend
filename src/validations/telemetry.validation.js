export function validateTelemetry(payload) {
  if (!payload.type || !payload.timestamp) {
    throw new Error("Invalid payload");
  }

  if (payload.type === "meter") {
    if (
      !payload.meterId ||
      payload.kwhConsumedAc == null ||
      payload.voltage == null
    ) {
      throw new Error("Invalid meter telemetry");
    }
  }

  if (payload.type === "vehicle") {
    if (
      !payload.vehicleId ||
      payload.soc == null ||
      payload.kwhDeliveredDc == null ||
      payload.batteryTemp == null
    ) {
      throw new Error("Invalid vehicle telemetry");
    }
  }
}
