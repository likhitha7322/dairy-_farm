// routes/healthRoutes.js
const express = require("express");
const router = express.Router();
const healthController = require("../controllers/healthController");

// create health record
router.post("/", healthController.create);

// list all (or ?cattleId=2)
router.get("/", healthController.list);

// update one record
router.put("/:id", healthController.update);

// delete one record
router.delete("/:id", healthController.remove);

module.exports = router;
