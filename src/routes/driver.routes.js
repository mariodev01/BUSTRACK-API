const express = require("express");
const router = express.Router();
//const drivers = require("../Data/Drivers");

const driverControl = require("../controllers/driverController.js");

//Lista de conductores
router.get("/", driverControl.getDrivers);

//Crear conductor
router.post("/DriverCreate",driverControl.createDriver);

//Obtener uno
router.get("/:id",driverControl.getDriverById);

//Update Driver
router.put("/:id",driverControl.updateDriver);

//Delete Driver
router.delete("/:id",driverControl.deleteDriver)

module.exports = router;