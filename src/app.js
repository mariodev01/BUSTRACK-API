const express = require("express");
const driverRoutes = require("./routes/driver.routes");

const app = express();

app.use(express.json());

app.use("/drivers", driverRoutes);

module.exports = app;