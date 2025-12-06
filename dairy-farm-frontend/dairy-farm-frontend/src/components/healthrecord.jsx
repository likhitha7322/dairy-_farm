// src/components/HealthRecord.jsx
import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaCalendarCheck,
  FaStethoscope,
  FaHeartbeat,
  FaMicrophone,
} from "react-icons/fa";
import { useLanguage } from "../lang/LanguageContext";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000/api";

export default function HealthRecord() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    cattleId: "",
    vaccinationDate: "",
    nextVaccinationDate: "",
    dewormingDate: "",
    nextDewormingDate: "",
    illness: "",
    illnessStartDate: "",
    severityLevel: "",
    illnessRemarks: "",
    checkupDate: "",
    remarks: "",
  });

  const [cattle, setCattle] = useState([]);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // load cattle list
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/cattle`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || t("failedToLoadCattle"));
        setCattle(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Load cattle error:", e);
        setErr(t("failedToLoadCattleList"));
      }
    };
    load();
  }, [t]);

  const calculateNextDate = (currentDate, daysToAdd = 1) => {
    if (!currentDate) return "";
    const d = new Date(currentDate);
    d.setDate(d.getDate() + daysToAdd);
    return d.toISOString().split("T")[0];
  };

  // keep next dates updated when base dates change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      nextVaccinationDate: calculateNextDate(prev.vaccinationDate),
      nextDewormingDate: calculateNextDate(prev.dewormingDate),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.vaccinationDate, formData.dewormingDate]);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccessMsg("");

    if (!formData.cattleId) {
      setErr(t("pleaseSelectCattle"));
      return;
    }

    setSaving(true);
    try {
      const payload = {
        cattleId: Number(formData.cattleId),
        vaccinationDate: formData.vaccinationDate || null,
        nextVaccinationDate: formData.nextVaccinationDate || null,
        dewormingDate: formData.dewormingDate || null,
        nextDewormingDate: formData.nextDewormingDate || null,
        illness: formData.illness || null,
        illnessStartDate: formData.illnessStartDate || null,
        severityLevel: formData.severityLevel || null,
        illnessRemarks: formData.illnessRemarks || null,
        checkupDate: formData.checkupDate || null,
        remarks: formData.remarks || null,
      };

      const res = await fetch(`${API_BASE}/health`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || t("failedToSaveHealth"));

      setSuccessMsg(t("healthRecordSaved"));
      // clear illness/checkup fields only
      setFormData((p) => ({
        ...p,
        illness: "",
        illnessStartDate: "",
        severityLevel: "",
        illnessRemarks: "",
        checkupDate: "",
        remarks: "",
      }));
    } catch (err) {
      console.error("Save error:", err);
      setErr(err.message || t("serverError"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={formContainer}>
      <h2 style={formTitle}>🩺 {t("healthRecordTitle")}</h2>

      {err && (
        <p style={{ color: "red", textAlign: "center", marginBottom: 8 }}>
          {err}
        </p>
      )}
      {successMsg && (
        <p style={{ color: "green", textAlign: "center", marginBottom: 8 }}>
          {successMsg}
        </p>
      )}

      <form onSubmit={handleSubmit} style={form}>
        {/* CATTLE SELECT */}
        <div style={formGroup}>
          <label style={sectionTitle}>{t("cattleLabel")}</label>
          <div style={inputGroup}>
            <FaUser style={iconStyle} />
            <select
              name="cattleId"
              value={formData.cattleId}
              onChange={handleChange}
              style={input}
            >
              <option value="">{t("selectCattle")}</option>
              {cattle.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.tagNo} - {c.name || t("unnamed")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* VACCINATION */}
        <div style={formGroup}>
          <label style={sectionTitle}>{t("vaccinationSection")}</label>
          <div style={dualInput}>
            <div style={inputColumn}>
              <span style={miniLabel}>{t("vaccinationDate")}</span>
              <div style={inputGroup}>
                <FaCalendarCheck style={iconStyle} />
                <input
                  type="date"
                  name="vaccinationDate"
                  value={formData.vaccinationDate}
                  onChange={handleChange}
                  style={inputSmall}
                />
              </div>
            </div>
            <div style={inputColumn}>
              <span style={miniLabel}>{t("nextDue")}</span>
              <div style={inputGroup}>
                <FaCalendarCheck style={iconStyle} />
                <input
                  type="date"
                  name="nextVaccinationDate"
                  value={formData.nextVaccinationDate}
                  onChange={handleChange}
                  style={inputSmall}
                />
              </div>
            </div>
          </div>
        </div>

        {/* DEWORMING */}
        <div style={formGroup}>
          <label style={sectionTitle}>{t("dewormingSection")}</label>
          <div style={dualInput}>
            <div style={inputColumn}>
              <span style={miniLabel}>{t("dewormingDate")}</span>
              <div style={inputGroup}>
                <FaCalendarCheck style={iconStyle} />
                <input
                  type="date"
                  name="dewormingDate"
                  value={formData.dewormingDate}
                  onChange={handleChange}
                  style={inputSmall}
                />
              </div>
            </div>
            <div style={inputColumn}>
              <span style={miniLabel}>{t("nextDue")}</span>
              <div style={inputGroup}>
                <FaCalendarCheck style={iconStyle} />
                <input
                  type="date"
                  name="nextDewormingDate"
                  value={formData.nextDewormingDate}
                  onChange={handleChange}
                  style={inputSmall}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ILLNESS */}
        <div style={formGroup}>
          <label style={sectionTitle}>{t("illnessSection")}</label>
          <div style={dualInput}>
            <div style={inputColumn}>
              <span style={miniLabel}>{t("illnessType")}</span>
              <div style={inputGroup}>
                <FaHeartbeat style={iconStyle} />
                <select
                  name="illness"
                  value={formData.illness}
                  onChange={handleChange}
                  style={input}
                >
                  <option value="">{t("selectIllness")}</option>
                  <option value="Fever">{t("illnessFever")}</option>
                  <option value="Mastitis">{t("illnessMastitis")}</option>
                  <option value="Bloat">{t("illnessBloat")}</option>
                  <option value="FootAndMouth">
                    {t("illnessFootAndMouth")}
                  </option>
                  <option value="Other">{t("illnessOther")}</option>
                </select>
              </div>
            </div>

            <div style={inputColumn}>
              <span style={miniLabel}>{t("onsetDate")}</span>
              <div style={inputGroup}>
                <FaCalendarCheck style={iconStyle} />
                <input
                  type="date"
                  name="illnessStartDate"
                  value={formData.illnessStartDate}
                  onChange={handleChange}
                  style={inputSmall}
                />
              </div>
            </div>
          </div>

          <div style={severityRow}>
            <label style={labelLeft}>{t("severity")}</label>
            <select
              name="severityLevel"
              value={formData.severityLevel}
              onChange={handleChange}
              style={severityBox}
            >
              <option value="">{t("selectSeverity")}</option>
              <option value="Mild">{t("severityMild")}</option>
              <option value="Moderate">{t("severityModerate")}</option>
              <option value="Severe">{t("severitySevere")}</option>
            </select>
          </div>

          <div style={inputGroup}>
            <textarea
              name="illnessRemarks"
              placeholder={t("illnessRemarksPlaceholder")}
              value={formData.illnessRemarks}
              onChange={handleChange}
              style={textarea}
            />
            <FaMicrophone style={micIconStyle} />
          </div>
        </div>

        {/* CHECKUP */}
        <div style={formGroup}>
          <label style={sectionTitle}>{t("checkupSection")}</label>
          <div style={inputGroup}>
            <FaStethoscope style={iconStyle} />
            <input
              type="date"
              name="checkupDate"
              value={formData.checkupDate}
              onChange={handleChange}
              style={inputSmall}
            />
          </div>
          <div style={inputGroup}>
            <FaStethoscope style={iconStyle} />
            <textarea
              name="remarks"
              placeholder={t("checkupRemarksPlaceholder")}
              value={formData.remarks}
              onChange={handleChange}
              style={textarea}
            />
            <FaMicrophone style={micIconStyle} />
          </div>
        </div>

        <button type="submit" style={submitButton} disabled={saving}>
          {saving ? t("saving") : t("saveHealthRecord")}
        </button>
      </form>
    </div>
  );
}

/* ---------- Styles ---------- */
const formContainer = {
  background: "white",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
  maxWidth: "700px",
  margin: "20px auto",
};
const formTitle = {
  textAlign: "center",
  fontSize: "1.8rem",
  color: "#1b5e20",
  fontWeight: "700",
  marginBottom: "20px",
};
const form = { display: "flex", flexDirection: "column", gap: "25px" };
const formGroup = { display: "flex", flexDirection: "column" };
const inputGroup = { display: "flex", alignItems: "center", gap: "10px" };
const sectionTitle = {
  color: "#1b5e20",
  fontWeight: "600",
  fontSize: "1rem",
  marginBottom: "8px",
};
const miniLabel = {
  fontSize: "0.8rem",
  color: "#555",
  marginBottom: "4px",
};
const labelLeft = { color: "#1b5e20", fontWeight: "600", fontSize: "1rem" };
const iconStyle = { fontSize: "20px", color: "#2e7d32" };
const input = {
  padding: "12px",
  fontSize: "14px",
  border: "1px solid #a5d6a7",
  borderRadius: "8px",
  outline: "none",
  flex: 1,
};
const inputSmall = { ...input, flex: 1 };
const textarea = {
  padding: "12px",
  fontSize: "14px",
  border: "1px solid #a5d6a7",
  borderRadius: "8px",
  outline: "none",
  width: "100%",
  height: "90px",
};
const inputColumn = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  gap: "5px",
};
const dualInput = { display: "flex", gap: "20px" };
const severityRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "10px",
};
const severityBox = {
  padding: "12px",
  fontSize: "14px",
  border: "1px solid #a5d6a7",
  borderRadius: "8px",
  width: "65%",
  outline: "none",
};
const micIconStyle = {
  fontSize: "20px",
  color: "#2e7d32",
  cursor: "pointer",
  marginLeft: "10px",
};
const submitButton = {
  background: "#2e7d32",
  color: "white",
  padding: "12px 20px",
  fontSize: "16px",
  borderRadius: "8px",
  cursor: "pointer",
  border: "none",
  transition: "0.3s",
};
