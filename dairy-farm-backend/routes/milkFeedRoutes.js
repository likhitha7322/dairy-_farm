// routes/milkFeedRoutes.js
const express = require("express");
const router = express.Router();
const milkFeedController = require("../controllers/milkFeedController");

// POST /api/milkfeeds
router.post("/", milkFeedController.create);

// ✅ NEW: GET /api/milkfeeds  (all milk records for dashboard)
router.get("/", milkFeedController.listAll);

// GET /api/milkfeeds/cattle/:cattleId
router.get("/cattle/:cattleId", milkFeedController.listByCattle);

// PUT /api/milkfeeds/:id
router.put("/:id", milkFeedController.update);

// DELETE /api/milkfeeds/:id
router.delete("/:id", milkFeedController.remove);

module.exports = router;
