const express = require("express");
const router = express.Router();

const busController = require("../controllers/busController.js");


router.get("/",busController.getBuses);

router.post("/buses",busController.createBus);

//Obtener uno
router.get("/:id",busController.getBusById);

//Update Bus
router.put("/:id",busController.updateBus);

//Delete Bus
router.delete("/:id",busController.deleteBus);

module.exports = router;