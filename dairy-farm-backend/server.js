// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");
const {
  getChatReply,
  getDiseaseAdvice,
  getFeedAdvice,
  getImageDiseaseAdvice,
} = require("./aiRules");

// load models
require("./models/cattle");
require("./models/milkFeed");
require("./models/healthRecord");
require("./models/breedingRecord");
require("./models/user"); // ✅ make sure User model is registered with Sequelize

// load routes
const cattleRoutes = require("./routes/cattleRoutes");
const milkFeedRoutes = require("./routes/milkFeedRoutes");
const healthRoutes = require("./routes/healthRoutes");
const breedingRoutes = require("./routes/breedingRoutes");
const authRoutes = require("./routes/authRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
 // ✅ auth routes (login / signup)

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// allow JSON + big payloads (for image base64 if needed)
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

app.get("/", (req, res) => {
  res.send("Dairy farm API is running");
});

// ✅ AUTH (login / register)
app.use("/api/auth", authRoutes);

// cattle
app.use("/api/cattle", cattleRoutes);

// milk/feed
app.use("/api/milkfeeds", milkFeedRoutes);
app.use("/api/milk-feed", milkFeedRoutes); // old alias

// health
app.use("/api/health", healthRoutes);
app.use("/api/healthrecords", healthRoutes); // old alias

// breeding
app.use("/api/breeding", breedingRoutes);
app.use("/api/reminders", reminderRoutes);

/* ---------------- AI ENDPOINTS ---------------- */

// Chat AI
app.post("/api/ai/chat", (req, res) => {
  const message = (req.body.message || "").trim();
  if (!message) {
    return res.status(400).json({
      success: false,
      error: "Message is required",
    });
  }

  const reply = getChatReply(message);
  return res.json({ success: true, reply });
});

// Disease AI (text symptoms)
app.post("/api/ai/disease", (req, res) => {
  const symptoms = (req.body.symptoms || "").trim();
  if (!symptoms) {
    return res.status(400).json({
      success: false,
      error: "Symptoms are required",
    });
  }

  const result = getDiseaseAdvice(symptoms);
  return res.json({
    success: true,
    disease: result.name,
    confidence: result.confidence,
    advice: result.advice,
  });
});

// Feed advice AI
app.post("/api/ai/feed", (req, res) => {
  const { milkYield, stage, bodyScore } = req.body || {};

  const result = getFeedAdvice({
    milkYield,
    stage,
    bodyScore,
  });

  return res.json({
    success: true,
    ...result,
  });
});

// Image + symptoms helper (image is optional, mostly for UI)
app.post("/api/ai/image-disease", (req, res) => {
  const symptoms = (req.body.symptoms || "").trim();
  // imageBase64 is ignored in logic but shows ability to receive
  const imageBase64 = req.body.imageBase64 || null;

  const result = getImageDiseaseAdvice(symptoms);

  return res.json({
    success: true,
    disease: result.name,
    confidence: result.confidence,
    advice: result.advice,
    imageReceived: !!imageBase64,
  });
});

/* ---------------- STARTUP ---------------- */

sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connected");
    return sequelize.sync(); // no force:true
  })
  .then(() => {
    console.log("DB Synced");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Startup error", err);
  });
