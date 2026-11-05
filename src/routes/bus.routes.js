const express = require("express");
const router = express.Router();

const busController = require("../controllers/busController.js");


router.get("/",busController.getBuses);

router.post("/",busController.createBus);

//Obtener uno
router.get("/:id",busController.getBusById);

//Update Bus
router.put("/:id",busController.updateBus);
//Delete Bus
router.delete("/:id",busController.deleteBus);

router.get("/drivers/:id/buses",busController.busXDriver);

module.exports = router;