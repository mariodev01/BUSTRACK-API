const express = require("express");
const driverRoutes = require("./routes/driver.routes");
const busesRoutes = require("../src/routes/bus.routes");

const app = express();

app.use(express.json());

app.use("/drivers", driverRoutes);

app.use("/buses", busesRoutes);

module.exports = app;