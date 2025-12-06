// src/components/Profile.jsx
import React, { useState, useEffect } from "react";
import "./AnimatedBackground";
import { useLanguage } from "../lang/LanguageContext";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000/api";

export default function Profile() {
  const { t } = useLanguage();

  const [user, setUser] = useState(null);
  const [cattleCount, setCattleCount] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    // ✅ Load saved user info from login (diary_user)
    const savedUser = JSON.parse(
      localStorage.getItem("diary_user") || "null"
    );
    if (savedUser) setUser(savedUser);

    // ✅ Load cattle count from backend (more accurate than localStorage)
    const loadCattleCount = async () => {
      try {
        const res = await fetch(`${API_BASE}/cattle`);
        const data = await res.json().catch(() => null);
        if (res.ok && Array.isArray(data)) {
          setCattleCount(data.length);
        } else if (res.ok && data && Array.isArray(data.data)) {
          setCattleCount(data.data.length);
        }
      } catch (e) {
        console.warn("Failed to load cattle count", e);
      }
    };
    loadCattleCount();

    // Load profile photo if saved
    const savedPhoto = localStorage.getItem("df_user_photo");
    if (savedPhoto) setPhoto(savedPhoto);
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e2) => {
        const result = e2.target.result;
        setPhoto(result);
        localStorage.setItem("df_user_photo", result);
      };
      reader.readAsDataURL(file);
    }
  };

  // NOTE: This only changes password in localStorage, not backend.
  // For mini-project demo it’s okay, but real app needs an API.
  const handlePasswordChange = () => {
    if (newPassword.trim() === "") {
      alert(t("pleaseEnterNewPassword"));
      return;
    }
    if (!user) return;

    const updatedUser = { ...user, password: newPassword };
    // keep the same key used by login
    localStorage.setItem("diary_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setNewPassword("");
    alert(t("passwordUpdatedSuccess"));
  };

  if (!user) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "60px",
          color: "#777",
        }}
      >
        <h3>{t("noUserInfoFound")}</h3>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "30px auto",
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        padding: "25px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1b5e20",
          fontWeight: "700",
          marginBottom: "10px",
        }}
      >
        👩‍🌾 {t("farmerProfileTitle")}
      </h1>
      <p
        style={{
          textAlign: "center",
          color: "#2e7d32",
          marginBottom: "25px",
        }}
      >
        {t("farmerProfileSubtitle")}
      </p>

      {/* Profile Picture Upload */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label htmlFor="photoUpload" style={{ cursor: "pointer" }}>
          {photo ? (
            <img
              src={photo}
              alt="Profile"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #4caf50",
              }}
            />
          ) : (
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                border: "2px dashed #4caf50",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4caf50",
                fontSize: "30px",
                margin: "0 auto",
              }}
            >
              📸
            </div>
          )}
        </label>
        <input
          id="photoUpload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handlePhotoChange}
        />
        <p style={{ color: "#666", fontSize: "13px" }}>
          {t("tapToUploadPhoto")}
        </p>
      </div>

      {/* User Info */}
      <div style={infoBox}>
        <strong style={label}>👤 {t("profileNameLabel")}</strong>
        <span>{user.name || t("notAvailable")}</span>
      </div>

      <div style={infoBox}>
        <strong style={label}>📞 {t("profilePhoneLabel")}</strong>
        <span>{user.phone || t("notAvailable")}</span>
      </div>

      <div style={infoBox}>
        <strong style={label}>🔐 {t("profilePasswordLabel")}</strong>
        <span>
          {showPassword ? user.password || "—" : "••••••••"}
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={eyeButton}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </span>
      </div>

      {/* Change Password */}
      <div style={{ marginTop: "20px" }}>
        <label style={label}>{t("changePasswordLabel")}</label>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="password"
            placeholder={t("enterNewPasswordPlaceholder")}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handlePasswordChange} style={btnGreen}>
            {t("updateButton")}
          </button>
        </div>
      </div>

      {/* Cattle Count */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h3 style={{ color: "#2e7d32" }}>
          🐄 {t("totalCattleManagedTitle")}
        </h3>
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#1b5e20",
          }}
        >
          {cattleCount}
        </p>
      </div>

      {/* Suggestions Section */}
      <div
        style={{
          marginTop: "30px",
          background: "#e8f5e9",
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <h4 style={{ color: "#1b5e20" }}>{t("suggestionTitle")}</h4>
        <p style={{ color: "#333", fontSize: "14px" }}>
          {t("suggestionBody")}
        </p>
      </div>
    </div>
  );
}

/* --- Styles --- */
const infoBox = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #eee",
};

const label = {
  color: "#1b5e20",
  fontWeight: "600",
};

const inputStyle = {
  flex: 1,
  padding: "8px 10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "14px",
};

const eyeButton = {
  background: "none",
  border: "none",
  cursor: "pointer",
  marginLeft: "8px",
  fontSize: "18px",
};

const btnGreen = {
  background: "#2e7d32",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "8px 16px",
  cursor: "pointer",
  fontWeight: "600",
};
