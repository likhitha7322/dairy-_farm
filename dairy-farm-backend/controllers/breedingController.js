const BreedingRecord = require("../models/breedingRecord");

// LIST
exports.list = async (req, res) => {
  try {
    const where = {};
    if (req.query.cattleId) {
      where.cattleId = req.query.cattleId;
    }

    const items = await BreedingRecord.findAll({
      where,
      order: [["serviceDate", "DESC"]],
    });

    res.json(items);
  } catch (err) {
    console.error("Breeding list error:", err);
    res.status(500).json({
      message: "Failed to load breeding records",
      error: err.message,
    });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const {
      cattleId,
      serviceDate,
      method,
      bullName,
      pregnancyStatus,
      expectedCalvingDate,
      calvingDate,
      remarks,
    } = req.body;

    if (!cattleId || !serviceDate) {
      return res
        .status(400)
        .json({ message: "cattleId and serviceDate are required" });
    }

    const created = await BreedingRecord.create({
      cattleId,
      serviceDate,
      method: method || null,
      bullName: bullName || null,
      pregnancyStatus: pregnancyStatus || null,
      expectedCalvingDate: expectedCalvingDate || null,
      calvingDate: calvingDate || null,
      remarks: remarks || null,
    });

    res.status(201).json(created);
  } catch (err) {
    console.error("Breeding create error:", err);
    res.status(500).json({
      message: "Failed to save breeding record",
      error: err.message,
    });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await BreedingRecord.findByPk(id);
    if (!record) {
      return res.status(404).json({ message: "Breeding record not found" });
    }

    const {
      cattleId,
      serviceDate,
      method,
      bullName,
      pregnancyStatus,
      expectedCalvingDate,
      calvingDate,
      remarks,
    } = req.body;

    await record.update({
      cattleId,
      serviceDate,
      method: method || null,
      bullName: bullName || null,
      pregnancyStatus: pregnancyStatus || null,
      expectedCalvingDate: expectedCalvingDate || null,
      calvingDate: calvingDate || null,
      remarks: remarks || null,
    });

    return res.json(record);
  } catch (err) {
    console.error("Breeding update error:", err);
    return res.status(500).json({
      message: "Failed to update breeding record",
      error: err.message,
    });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await BreedingRecord.findByPk(id);
    if (!record) {
      return res.status(404).json({ message: "Breeding record not found" });
    }

    await record.destroy();
    return res.json({ message: "Breeding record deleted successfully" });
  } catch (err) {
    console.error("Breeding delete error:", err);
    return res.status(500).json({
      message: "Failed to delete breeding record",
      error: err.message,
    });
  }
};
