// routes/cattleRoutes.js
const express = require("express");
const router = express.Router();
const cattleController = require("../controllers/cattleController");

router.post("/", cattleController.create);
router.get("/", cattleController.list);
router.get("/:id", cattleController.getById);
router.put("/:id", cattleController.update);
router.delete("/:id", cattleController.remove);

module.exports = router;
