// controllers/healthController.js
const HealthRecord = require("../models/healthRecord");

// POST /api/health
exports.create = async (req, res) => {
  try {
    const rec = await HealthRecord.create(req.body);
    return res.status(201).json(rec);
  } catch (err) {
    console.error("Health create error:", err);
    return res.status(500).json({
      message: "Failed to save health record",
      error: err.message,
    });
  }
};

// GET /api/health
exports.list = async (req, res) => {
  try {
    const where = {};
    if (req.query.cattleId) where.cattleId = req.query.cattleId;

    const items = await HealthRecord.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });

    return res.json(items);
  } catch (err) {
    console.error("Health list error:", err);
    return res.status(500).json({
      message: "Failed to load health records",
      error: err.message,
    });
  }
};

// PUT /api/health/:id
exports.update = async (req, res) => {
  try {
    const rec = await HealthRecord.findByPk(req.params.id);
    if (!rec) {
      return res.status(404).json({ message: "Health record not found" });
    }

    await rec.update(req.body);
    return res.json({ message: "Updated successfully" });
  } catch (err) {
    console.error("Health update error:", err);
    return res.status(500).json({
      message: "Failed to update health record",
      error: err.message,
    });
  }
};

// DELETE /api/health/:id
exports.remove = async (req, res) => {
  try {
    const rec = await HealthRecord.findByPk(req.params.id);
    if (!rec) {
      return res.status(404).json({ message: "Health record not found" });
    }

    await rec.destroy();
    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Health delete error:", err);
    return res.status(500).json({
      message: "Failed to delete health record",
      error: err.message,
    });
  }
};
