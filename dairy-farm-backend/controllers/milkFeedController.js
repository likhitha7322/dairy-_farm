// controllers/milkFeedController.js
const MilkFeed = require("../models/milkFeed");

// Earnings formula:
// earnings = (morning + evening) * milkPricePerLitre - (feedTotalCost + runningCost)
function computeFromBody(body) {
  const quantity = Number(body.quantity || 0);             // kg/day
  const costPerUnit = Number(body.costPerUnit || 0);       // ₹/kg
  const milkPricePerLitre = Number(body.milkPricePerLitre || 0);
  const morningYield = Number(body.morningYield || 0);
  const eveningYield = Number(body.eveningYield || 0);
  const runningCost = Number(body.runningCost || 0);       // other costs /day

  const totalYield = morningYield + eveningYield;
  const feedTotalCost = quantity * costPerUnit;
  const milkIncome = totalYield * milkPricePerLitre;
  const earnings = milkIncome - (feedTotalCost + runningCost);

  return {
    quantity,
    costPerUnit,
    milkPricePerLitre,
    morningYield,
    eveningYield,
    runningCost,
    totalYield,
    feedTotalCost,
    milkIncome,
    earnings,
  };
}

// ✅ NEW: GET /api/milkfeeds  (all records for dashboard)
exports.listAll = async (req, res) => {
  try {
    const recs = await MilkFeed.findAll({
      order: [["date", "DESC"]],
    });

    // convert Sequelize instances to plain JSON
    const list = recs.map((r) => r.toJSON());
    return res.json(list);
  } catch (err) {
    console.error("MilkFeed listAll error:", err);
    return res.status(500).json({
      message: "Failed to load milk & feed records",
      error: err.message,
    });
  }
};

// POST /api/milkfeeds
exports.create = async (req, res) => {
  try {
    const {
      quantity,
      costPerUnit,
      milkPricePerLitre,
      morningYield,
      eveningYield,
      runningCost,
      totalYield,
      feedTotalCost,
      milkIncome,
      earnings,
    } = computeFromBody(req.body);

    const rec = await MilkFeed.create({
      cattleId: req.body.cattleId,
      date: req.body.date,
      feedType: req.body.feedType || null,

      morningYield,
      eveningYield,
      totalYield,

      milkPricePerLitre,
      milkIncome,

      quantity,
      feedTotalCost,
      earnings,
    });

    const json = rec.toJSON();
    // these two are not stored in DB but useful in response
    json.costPerUnit = costPerUnit;
    json.runningCost = runningCost;

    return res.status(201).json(json);
  } catch (err) {
    console.error("MilkFeed create error:", err);
    return res.status(500).json({
      message: "Create error",
      error: err.message,
    });
  }
};

// GET /api/milkfeeds/cattle/:cattleId
exports.listByCattle = async (req, res) => {
  try {
    const recs = await MilkFeed.findAll({
      where: { cattleId: req.params.cattleId },
      order: [["date", "DESC"]],
    });

    const list = recs.map((r) => r.toJSON());
    return res.json(list);
  } catch (err) {
    console.error("MilkFeed list error:", err);
    return res.status(500).json({
      message: "List error",
      error: err.message,
    });
  }
};

// PUT /api/milkfeeds/:id
exports.update = async (req, res) => {
  try {
    const rec = await MilkFeed.findByPk(req.params.id);
    if (!rec) {
      return res.status(404).json({ message: "Record not found" });
    }

    const {
      quantity,
      costPerUnit,
      milkPricePerLitre,
      morningYield,
      eveningYield,
      runningCost,
      totalYield,
      feedTotalCost,
      milkIncome,
      earnings,
    } = computeFromBody(req.body);

    await rec.update({
      cattleId: req.body.cattleId,
      date: req.body.date,
      feedType: req.body.feedType || null,

      morningYield,
      eveningYield,
      totalYield,

      milkPricePerLitre,
      milkIncome,

      quantity,
      feedTotalCost,
      earnings,
    });

    const json = rec.toJSON();
    json.costPerUnit = costPerUnit;
    json.runningCost = runningCost;

    return res.json({ message: "Updated successfully", record: json });
  } catch (err) {
    console.error("MilkFeed update error:", err);
    return res.status(500).json({
      message: "Update error",
      error: err.message,
    });
  }
};

// DELETE /api/milkfeeds/:id
exports.remove = async (req, res) => {
  try {
    const rec = await MilkFeed.findByPk(req.params.id);
    if (!rec) {
      return res.status(404).json({ message: "Record not found" });
    }

    await rec.destroy();
    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("MilkFeed delete error:", err);
    return res.status(500).json({
      message: "Delete error",
      error: err.message,
    });
  }
};
