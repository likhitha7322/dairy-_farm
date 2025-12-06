// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

// helper: create token
const generateToken = (userId) =>
  jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });

/* ---------- SIGNUP / REGISTER ---------- */
/**
 * Body:
 * {
 *   "name": "Likhitha",
 *   "email": "someone@example.com",   // optional
 *   "phone": "9876543210",           // optional but one of email/phone required
 *   "password": "secret123"
 * }
 */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !password || (!email && !phone)) {
      return res
        .status(400)
        .json({ message: "Name, password and email/phone are required" });
    }

    // check if user already exists by email OR phone
    const orConditions = [];
    if (email) orConditions.push({ email });
    if (phone) orConditions.push({ phone });

    const existing =
      orConditions.length > 0
        ? await User.findOne({
            where: {
              [Op.or]: orConditions,
            },
          })
        : null;

    if (existing) {
      return res
        .status(400)
        .json({ message: "User with this email/phone already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email || null,
      phone: phone || null,
      password: hashed,
    });

    const token = generateToken(user.id);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Register error:", err);

    if (err.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "Email or phone already in use" });
    }

    return res.status(500).json({ message: "Server error" });
  }
};

/* ---------- LOGIN ---------- */
/**
 * Frontend sends:
 * {
 *   "identifier": "phone or email",
 *   "password": "password"
 * }
 */
exports.loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // also accept old style email/username just in case
    const idValue = identifier || req.body.email || req.body.username;

    if (!idValue || !password) {
      return res
        .status(400)
        .json({ message: "Missing email/phone or password" });
    }

    // find user by email OR phone
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: idValue }, { phone: idValue }],
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email/phone or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email/phone or password" });
    }

    const token = generateToken(user.id);

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ---------- GET CURRENT USER (for /api/auth/me) ---------- */
exports.getMe = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findByPk(userId, {
      attributes: ["id", "name", "email", "phone"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ success: true, user });
  } catch (err) {
    console.error("GetMe error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
