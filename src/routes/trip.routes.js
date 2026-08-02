const express = require("express");
const router = express.Router();


const tripController = require("../controllers/tripController");

router.get("/",tripController.get);

router.post("/trips",tripController.create);

router.get("/:id",tripController.getById);

router.put("/:id",tripController.update);

router.delete("/:id",tripController.deleteT);


module.exports = router;