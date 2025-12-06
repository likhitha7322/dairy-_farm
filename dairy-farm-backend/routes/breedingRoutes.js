// routes/breedingRoutes.js
const express = require("express");
const router = express.Router();
const breedingController = require("../controllers/breedingController");

// GET /api/breeding?cattleId=...
router.get("/", breedingController.list);

// POST /api/breeding
router.post("/", breedingController.create);

// PUT /api/breeding/:id
router.put("/:id", breedingController.update);

// DELETE /api/breeding/:id
router.delete("/:id", breedingController.remove);

module.exports = router;
