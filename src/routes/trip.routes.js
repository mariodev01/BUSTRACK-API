const express = require("express");
const router = express.Router();


const tripController = require("../controllers/tripController");

router.get("/");

router.post("/trips");

router.get("/:id");

router.put("/:id");

router.delete("/:id");


module.exports = router;