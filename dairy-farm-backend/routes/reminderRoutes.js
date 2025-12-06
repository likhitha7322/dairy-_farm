// routes/reminderRoutes.js
const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");

const Cattle = require("../models/cattle");
const MilkFeed = require("../models/milkFeed");
const HealthRecord = require("../models/healthRecord");
const BreedingRecord = require("../models/breedingRecord");

// helper to get yyyy-mm-dd
function toDateOnly(d) {
  return d.toISOString().slice(0, 10);
}

// build a nice label from cattle row
function cattleLabel(c) {
  return (
    c.name ||
    c.tagNumber ||
    c.earTag ||
    c.id ||
    c.cattleId ||
    `Cattle ${String(c.id || c.cattleId || "").slice(-4)}`
  );
}

router.get("/", async (req, res) => {
  try {
    const today = new Date();
    const todayStr = toDateOnly(today);

    // 1) Load all cattle (so we can compare who is missing milk record)
    const cattleList = await Cattle.findAll().catch(() => []);

    // 2) Milk records for today
    const milkToday = await MilkFeed.findAll({
      where: { date: todayStr },
    }).catch(() => []);

    const cattleWithMilkToday = new Set(
      milkToday
        .map((r) => r.cattleId || r.cowId || r.cattle_id)
        .filter(Boolean)
    );

    // cattle that do NOT have milk record today
    const missingMilkCattle = cattleList
      .filter((c) => {
        const cid = c.id || c.cattleId;
        if (!cid) return false;
        return !cattleWithMilkToday.has(cid);
      })
      .map((c) => ({
        id: c.id || c.cattleId,
        label: cattleLabel(c),
      }));

    const missingMilkFeed = missingMilkCattle.length > 0;

    // 3) Vaccination due / overdue
    // assumes HealthRecord has field "nextVaccinationDate"
    const vaccinationRecords = await HealthRecord.findAll({
      where: {
        nextVaccinationDate: {
          [Op.lte]: todayStr,
        },
      },
    }).catch(() => []);

    const vaccDueMap = new Map(); // key = cattleId, value = date
    vaccinationRecords.forEach((r) => {
      const cid = r.cattleId || r.cowId || r.cattle_id;
      if (!cid) return;
      const date = r.nextVaccinationDate || r.next_vaccination_date;
      if (!date) return;
      // keep soonest due date
      if (!vaccDueMap.has(cid) || date < vaccDueMap.get(cid)) {
        vaccDueMap.set(cid, date);
      }
    });

    const vaccinationDueCattle = [];
    vaccDueMap.forEach((date, cid) => {
      const cow =
        cattleList.find(
          (c) =>
            c.id === cid ||
            c.cattleId === cid ||
            c.tagNumber === cid ||
            c.earTag === cid
        ) || {};
      vaccinationDueCattle.push({
        id: cid,
        label: cattleLabel(cow),
        nextVaccinationDate: date,
      });
    });

    const dueVaccinationCount = vaccinationDueCattle.length;

    // 4) Breeding follow-up:
    // rule: pregnancyStatus = 'Inseminated' and serviceDate <= today-21 days
    const twentyOneDaysAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 21
    );
    const twentyOneStr = toDateOnly(twentyOneDaysAgo);

    const breedingRecords = await BreedingRecord.findAll({
      where: {
        pregnancyStatus: "Inseminated",
        serviceDate: {
          [Op.lte]: twentyOneStr,
        },
      },
    }).catch(() => []);

    const breedingFollowUps = breedingRecords.map((r) => {
      const cid = r.cattleId || r.cowId || r.cattle_id;
      const cow =
        cattleList.find(
          (c) =>
            c.id === cid ||
            c.cattleId === cid ||
            c.tagNumber === cid ||
            c.earTag === cid
        ) || {};
      return {
        id: cid,
        label: cattleLabel(cow),
        serviceDate: r.serviceDate || r.service_date,
      };
    });

    const breedingFollowUpCount = breedingFollowUps.length;

    return res.json({
      success: true,
      missingMilkFeed,
      dueVaccinationCount,
      breedingFollowUpCount,
      missingMilkCattle,
      vaccinationDueCattle,
      breedingFollowUps,
    });
  } catch (err) {
    console.error("Reminder API error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to compute reminders",
    });
  }
});

module.exports = router;
