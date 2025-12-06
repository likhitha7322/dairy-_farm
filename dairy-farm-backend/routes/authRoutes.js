// routes/authRoutes.js
const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/signup", registerUser); // alias
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
