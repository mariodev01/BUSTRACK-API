const express = require("express");
const driverRoutes = require("./routes/driver.routes");
const busesRoutes = require("../src/routes/bus.routes");
const statusRoutes = require("../src/routes/busStatus.routes");

const app = express();

app.use(express.json());

app.use("/drivers", driverRoutes);

app.use("/buses", busesRoutes);

app.use("/bus-status", statusRoutes);

module.exports = app;