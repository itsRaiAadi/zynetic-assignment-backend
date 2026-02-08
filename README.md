# ⚡ High-Scale Energy Ingestion Engine

A backend service designed to ingest, store, and analyze high-frequency energy telemetry from smart meters and electric vehicles.
The system is built to simulate real-world, high-scale ingestion pipelines with efficient storage and analytics.

---

## 🔗 Live Deployment

**Base URL**

```
https://zynetic-assignment-backend.onrender.com
```

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **PostgreSQL** (Render Managed Database)
* **Render** (Deployment)
* **Postman** (API Testing)

> The original assignment specified NestJS and Docker.
> With prior approval, this implementation uses **Express.js** and **Render**, while maintaining the same architectural intent and scalability considerations.

---

## 🧠 System Architecture

The system follows a **hot + cold storage** architecture, commonly used in large-scale telemetry and IoT platforms.

```
Clients / Devices
        |
        v
 POST /v1/ingest
        |
        v
 Express API
        |
        +--> Cold Storage (Historical)
        |       - meter_readings
        |       - vehicle_readings
        |
        +--> Hot Storage (Latest State)
                - meter_live_status
                - vehicle_live_status
```

### Design Objectives

* High write throughput
* Efficient analytical queries
* Clear separation of real-time vs historical data
* Stateless, cloud-native backend

---

## 🗄 Database Design

### Cold Storage (Historical Data)

Stores immutable, append-only telemetry records used for analytics.

* **`meter_readings`**
* **`vehicle_readings`**

Optimized with indexes on `(entity_id, timestamp)` for fast range queries.

---

### Hot Storage (Live State)

Stores the **latest known state** of each device.

* **`meter_live_status`**
* **`vehicle_live_status`**

Implemented using PostgreSQL **UPSERT (`ON CONFLICT`)** for atomic updates.

---

## 🔁 Data Ingestion API

### Endpoint

```
POST /v1/ingest
```

### Supported Telemetry Types

* `meter`
* `vehicle`

---

### Meter Payload Example

```json
{
  "type": "meter",
  "meterId": "MTR-1001",
  "kwhConsumedAc": 15.5,
  "voltage": 230,
  "timestamp": "2026-02-08T10:00:00Z"
}
```

---

### Vehicle Payload Example

```json
{
  "type": "vehicle",
  "vehicleId": "EV-2001",
  "soc": 78,
  "kwhDeliveredDc": 12.2,
  "batteryTemp": 34,
  "timestamp": "2026-02-08T10:00:00Z"
}
```

---

### Ingestion Flow

1. Validate incoming telemetry
2. Persist data into cold storage
3. Update live state in hot storage
4. Respond with success status

---

## 📊 Analytics API

### Vehicle Performance Analytics

```
GET /v1/analytics/performance/:vehicleId
```

### Metrics Returned

* Total AC energy consumed
* Total DC energy delivered
* Charging efficiency
* Average battery temperature

### Example Response

```json
{
  "totalAc": "29.5",
  "totalDc": "23.7",
  "efficiency": 0.80,
  "avgBatteryTemp": "33.5"
}
```

---

## ⚙ Performance & Scalability

* Indexed time-series tables for fast reads
* Append-only ingestion model
* Lightweight hot storage for real-time access
* Stateless API design for horizontal scaling
* PostgreSQL optimized for aggregations

---

## 📁 Project Structure

```
energy-ingestion-engine/
│
├── src/
│   ├── app.js               # Express app setup
│   ├── server.js            # Server bootstrap
│   │
│   ├── config/
│   │   ├── db.js            # PostgreSQL connection
│   │   └── env.js           # Environment configuration
│   │
│   ├── routes/
│   │   ├── ingest.routes.js
│   │   └── analytics.routes.js
│   │
│   ├── controllers/
│   │   ├── ingest.controller.js
│   │   └── analytics.controller.js
│   │
│   ├── services/
│   │   ├── ingest.service.js
│   │   └── analytics.service.js
│   │
│   ├── repositories/
│   │   ├── meter.repo.js
│   │   └── vehicle.repo.js
│   │
│   ├── validations/
│   │   └── telemetry.validation.js
│   │
│   └── utils/
│       └── time.js
│
├── sql/
│   └── schema.sql            # Database schema
│
├── postman/
│   └── collection.json      # API test collection
│
├── .env.example
├── package.json
├── render.yaml
└── README.md
```

This structure enforces **separation of concerns** and mirrors real-world production backends.

---

## 🔐 Environment Variables

```env
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/<db>?sslmode=require
PORT=5000
```

---

## 🧪 API Testing

A Postman collection is included:

```
postman/collection.json
```

It covers:

* Meter ingestion
* Vehicle ingestion
* Analytics endpoints

---

## ☁ Deployment

* Backend deployed on **Render**
* PostgreSQL hosted on **Render Managed Database**
* Secure SSL database connection
* Configuration via environment variables

---

## ✅ Assignment Coverage

✔ High-scale ingestion design
✔ Hot & cold storage strategy
✔ Optimized PostgreSQL schema
✔ Analytics computation
✔ Cloud deployment
✔ Production-ready code structure

---

## 👤 Author

**Aditya Rai**
Backend Developer Candidate
