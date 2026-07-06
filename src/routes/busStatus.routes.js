const express = require("express");
const router = express.Router();

const statusC = require("../controllers/busStatusController");

router.get("/",statusC.getStatus);

router.post("/statusCreate",statusC.createStatus);

//Obtener uno
router.get("/:id",statusC.getById);

//Update Bus
router.put("/:id",statusC.updateStatus);
//Delete Bus
router.delete("/:id",statusC.deleteStatus);

module.exports = router;
