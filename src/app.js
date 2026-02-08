import express from "express";
import ingestRoutes from "./routes/ingest.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

const app = express();
app.use(express.json());

app.use("/v1/ingest", ingestRoutes);
app.use("/v1/analytics", analyticsRoutes);

export default app;
