// controllers/cattleController.js
const Cattle = require("../models/cattle");

exports.create = async (req, res) => {
  try {
    const cattle = await Cattle.create(req.body);
    res.status(201).json(cattle);
  } catch (err) {
    res.status(500).json({ message: "Save error", error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const data = await Cattle.findAll({ order: [["id", "DESC"]] });
    res.json(data);
  } catch {
    res.status(500).json({ message: "List error" });
  }
};

exports.getById = async (req, res) => {
  const row = await Cattle.findByPk(req.params.id);
  if (!row) return res.status(404).json({ message: "Not found" });
  res.json(row);
};

exports.update = async (req, res) => {
  try {
    const row = await Cattle.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: "Not found" });
    await row.update(req.body);
    res.json({ message: "Updated" });
  } catch {
    res.status(500).json({ message: "Update error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const row = await Cattle.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: "Not found" });
    await row.destroy();
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Delete error" });
  }
};
