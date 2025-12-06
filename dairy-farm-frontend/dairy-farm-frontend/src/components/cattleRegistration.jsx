// src/components/cattleRegistration.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiMic } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useLanguage } from "../lang/LanguageContext";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000/api";

// helper to auto-generate cattle id
const generateCattleId = () => {
  const ts = Date.now().toString();
  return `CATTLE-${ts.slice(-6)}`;
};

export default function CattleRegistration() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useLanguage();

  const [form, setForm] = useState({
    tagNo: generateCattleId(), // auto Cattle ID
    name: "",
    breed: "",
    dob: "",
    avgMilkYield: "",
    pregnancyStatus: "No",
    lastBreedingDate: "",
    // extra fields (in case backend expects them)
    gender: "",
    status: "active",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  // ------- load existing cattle in edit mode -------
  useEffect(() => {
    const loadExisting = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/cattle/${id}`);
        if (!res.ok) throw new Error("Failed to load cattle");
        const data = await res.json();
        setForm((prev) => ({
          ...prev,
          tagNo: data.tagNo || prev.tagNo,
          name: data.name || "",
          breed: data.breed || "",
          dob: data.dob ? data.dob.slice(0, 10) : "",
          avgMilkYield: data.avgMilkYield || "",
          pregnancyStatus: data.pregnancyStatus || "No",
          lastBreedingDate: data.lastBreedingDate
            ? data.lastBreedingDate.slice(0, 10)
            : "",
          gender: data.gender || "",
          status: data.status || "active",
          notes: data.notes || "",
        }));
      } catch (e) {
        console.error(e);
        setErr(t("failedToLoadCattle") || "Failed to load cattle details.");
      } finally {
        setLoading(false);
      }
    };

    loadExisting();
  }, [id, t]);

  // ------- handlers -------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setForm({
      tagNo: generateCattleId(),
      name: "",
      breed: "",
      dob: "",
      avgMilkYield: "",
      pregnancyStatus: "No",
      lastBreedingDate: "",
      gender: "",
      status: "active",
      notes: "",
    });
    setErr("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");

    if (!form.tagNo.trim()) {
      setErr("Cattle ID missing.");
      return;
    }

    try {
      setLoading(true);
      const method = id ? "PUT" : "POST";
      const url = id ? `${API_BASE}/cattle/${id}` : `${API_BASE}/cattle`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to save cattle");
      }

      setSuccess("Cattle saved successfully.");
      setTimeout(() => navigate("/cattle"), 600);
    } catch (e) {
      console.error(e);
      setErr("Unable to save cattle. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Karnataka + nearby breeds
  const karnatakaBreeds = [
    "",
    "Hallikar",
    "Amrit Mahal",
    "Malnad Gidda",
    "Deoni",
    "Krishna Valley",
    "Khillari",
    "Other / Exotic",
  ];

  // ------- render -------
  return (
    <div style={pageWrapper}>
      <button
        type="button"
        onClick={() => navigate("/cattle")}
        style={backLink}
      >
        ← {t("backToCattleList") || "Back to Cattle List"}
      </button>

      <div style={outerBox}>
        {/* Main title already translated correctly */}
        <h2 style={mainTitle}>
          {t("navRegisterCattle") || "Cattle Registration"}
        </h2>

        {/* Top inner box: Cattle ID, Name, Breed */}
        <div style={topInnerBox}>
          {/* Cattle ID (auto) */}
          <div style={formGroup}>
            {/* <<< FIXED HEADING >>> */}
            <label style={label}>Cattle ID</label>
            <input
              type="text"
              name="tagNo"
              value={form.tagNo}
              readOnly
              style={input}
            />
          </div>

          {/* Cattle Name with mic icon */}
          <div style={formGroup}>
            {/* <<< FIXED HEADING >>> */}
            <label style={label}>Cattle Name</label>
            <div style={inputWithIcon}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                style={inputIconInner}
                // simple English placeholder so key doesn’t show
                placeholder="Enter name"
              />
              <FiMic style={micIcon} />
            </div>
          </div>

          {/* Breed dropdown with Karnataka breeds */}
          <div style={formGroup}>
            {/* uses existing translation key 'breed' so text is proper */}
            <label style={label}>{t("breed") || "Breed"}</label>
            <select
              name="breed"
              value={form.breed}
              onChange={handleChange}
              style={input}
            >
              {karnatakaBreeds.map((b, i) => (
                <option key={i} value={b}>
                  {b === "" ? "Select breed" : b}
                </option>
              ))}
            </select>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {err && <p style={errorText}>{err}</p>}
          {success && <p style={successText}>{success}</p>}

          {/* Date of birth / age with calendar icon */}
          <div style={formGroup}>
            {/* <<< FIXED HEADING >>> */}
            <label style={label}>Date of birth / age</label>
            <div style={inputWithIcon}>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                style={inputIconInner}
              />
              <FaRegCalendarAlt style={calendarIcon} />
            </div>
          </div>

          {/* Average milk yield with mic icon */}
          <div style={formGroup}>
            {/* use existing avgMilkPerDay key so Kannada etc are proper */}
            <label style={label}>
              {t("avgMilkPerDay") || "Average milk yield (L/day)"}
            </label>
            <div style={inputWithIcon}>
              <input
                type="number"
                step="0.1"
                min="0"
                name="avgMilkYield"
                value={form.avgMilkYield}
                onChange={handleChange}
                style={inputIconInner}
                placeholder="0.0"
              />
              <FiMic style={micIcon} />
            </div>
          </div>

          {/* Pregnancy status */}
          <div style={formGroup}>
            <label style={label}>
              {t("pregnancyStatus") || "Pregnancy status"}
            </label>
            <select
              name="pregnancyStatus"
              value={form.pregnancyStatus}
              onChange={handleChange}
              style={input}
            >
              <option value="No">{t("no") || "No"}</option>
              <option value="Yes">{t("yes") || "Yes"}</option>
            </select>
          </div>

          {/* Last breeding date with calendar icon */}
          <div style={formGroup}>
            <label style={label}>
              {t("lastBreeding") || "Last breeding date"}
            </label>
            <div style={inputWithIcon}>
              <input
                type="date"
                name="lastBreedingDate"
                value={form.lastBreedingDate}
                onChange={handleChange}
                style={inputIconInner}
              />
              <FaRegCalendarAlt style={calendarIcon} />
            </div>
          </div>

          {/* Save / Cancel buttons */}
          <div style={buttonRow}>
            <button type="submit" style={saveBtn} disabled={loading}>
              {loading ? t("saving") || "Saving..." : t("save") || "Save"}
            </button>
            <button
              type="button"
              style={cancelBtn}
              onClick={clearForm}
              disabled={loading}
            >
              {t("cancel") || "Cancel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------- styles ---------------- */

const pageWrapper = {
  padding: 16,
  minHeight: "100vh",
  background: "#f1fbf2",
};

const backLink = {
  background: "transparent",
  border: "none",
  color: "#1b5e20",
  fontSize: 14,
  cursor: "pointer",
  marginBottom: 10,
};

const outerBox = {
  background: "#ffffff",
  borderRadius: 10,
  border: "1px solid #c8e6c9",
  maxWidth: 420,
  margin: "0 auto",
  padding: 16,
  boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
};

const mainTitle = {
  margin: 0,
  marginBottom: 10,
  fontSize: 18,
  color: "#1b5e20",
  fontWeight: 700,
};

const topInnerBox = {
  border: "1px solid #c8e6c9",
  borderRadius: 6,
  padding: 10,
  marginBottom: 16,
};

const formGroup = {
  marginBottom: 12,
};

const label = {
  display: "block",
  fontSize: 14,
  marginBottom: 4,
  color: "#2e7d32",
};

const input = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 6,
  border: "1px solid #b5cbb7",
  fontSize: 14,
  background: "#ffffff",
  outline: "none",
};

const inputWithIcon = {
  position: "relative",
};

const inputIconInner = {
  ...input,
  paddingRight: 32,
};

const micIcon = {
  position: "absolute",
  right: 8,
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: 18,
  color: "#2e7d32",
  opacity: 0.8,
};

const calendarIcon = {
  position: "absolute",
  right: 8,
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: 18,
  color: "#2e7d32",
  opacity: 0.8,
};

const errorText = {
  color: "#c62828",
  fontSize: 13,
  marginBottom: 6,
};

const successText = {
  color: "#2e7d32",
  fontSize: 13,
  marginBottom: 6,
};

const buttonRow = {
  display: "flex",
  justifyContent: "center",
  gap: 20,
  marginTop: 18,
};

const saveBtn = {
  minWidth: 100,
  padding: "8px 16px",
  borderRadius: 6,
  border: "1px solid #1b5e20",
  background: "#1b5e20",
  color: "#ffffff",
  fontSize: 14,
  cursor: "pointer",
};

const cancelBtn = {
  minWidth: 100,
  padding: "8px 16px",
  borderRadius: 6,
  border: "1px solid #1b5e20",
  background: "#ffffff",
  color: "#1b5e20",
  fontSize: 14,
  cursor: "pointer",
};
