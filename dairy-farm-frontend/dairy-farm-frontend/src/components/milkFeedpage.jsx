// src/components/milkFeedpage.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./AnimatedBackground";
import { FaMicrophone } from "react-icons/fa";
import { useLanguage } from "../lang/LanguageContext";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000/api";

export default function MilkFeedpage() {
  const { t } = useLanguage();

  const [form, setForm] = useState({
    cattleId: "",
    date: "",
    feedType: "",
    quantity: "",
    costPerUnit: "",
    milkPricePerLitre: "40",
    morningYield: "",
    eveningYield: "",
    runningCost: "",
  });

  const [cattle, setCattle] = useState([]);
  const [records, setRecords] = useState([]);
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // --------- Calculations ----------
  const dailyFeedCost =
    Number(form.costPerUnit || 0) * Number(form.quantity || 0);

  const totalYield =
    Number(form.morningYield || 0) + Number(form.eveningYield || 0);

  const milkPrice = Number(form.milkPricePerLitre || 0);

  const earnings =
    totalYield * milkPrice -
    (dailyFeedCost + Number(form.runningCost || 0));

  const cattleMap = useMemo(() => {
    const m = {};
    cattle.forEach((c) => {
      m[c.id] = c;
    });
    return m;
  }, [cattle]);

  // --------- Load cattle for dropdown ----------
  useEffect(() => {
    const loadCattle = async () => {
      try {
        const res = await fetch(`${API_BASE}/cattle`);
        const data = await res.json();
        if (!res.ok)
          throw new Error(data?.message || t("failedToLoadCattle"));
        setCattle(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Load cattle error:", e);
        setErr(t("failedToLoadCattle"));
      }
    };
    loadCattle();
  }, [t]);

  // --------- Load records for a cattle ----------
  const loadRecordsForCattle = async (cattleId) => {
    if (!cattleId) {
      setRecords([]);
      return;
    }
    setLoadingRecords(true);
    setErr("");

    try {
      const res = await fetch(`${API_BASE}/milkfeeds/cattle/${cattleId}`);
      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.message || t("failedToLoadRecords"));

      const arr = Array.isArray(data) ? data : [];
      setRecords(arr);

      // auto-fill settings from latest record
      if (arr.length > 0 && !editingId) {
        const latest = arr[0];
        setForm((prev) => ({
          ...prev,
          feedType: latest.feedType || prev.feedType,
          quantity:
            latest.quantity != null ? String(latest.quantity) : prev.quantity,
          costPerUnit:
            latest.costPerUnit != null
              ? String(latest.costPerUnit)
              : prev.costPerUnit,
          milkPricePerLitre:
            latest.milkPricePerLitre != null
              ? String(latest.milkPricePerLitre)
              : prev.milkPricePerLitre,
        }));
      }
    } catch (e) {
      console.error("Load milk-feed error:", e);
      setErr(t("failedToLoadRecords"));
      setRecords([]);
    } finally {
      setLoadingRecords(false);
    }
  };

  // --------- Form change ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "cattleId") {
      setEditingId(null);
      loadRecordsForCattle(value);
    }
  };

  // --------- Voice input ----------
  const handleVoiceInput = (field) => {
    if (!("webkitSpeechRecognition" in window)) {
      alert(t("voiceNotSupported"));
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();
    recognition.onresult = (event) => {
      const value = event.results[0][0].transcript;
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  };

  // --------- Edit record ----------
  const handleEdit = (rec) => {
    setEditingId(rec.id);
    setForm({
      cattleId: String(rec.cattleId),
      date: rec.date || "",
      feedType: rec.feedType || "",
      quantity:
        rec.quantity !== null && rec.quantity !== undefined
          ? String(rec.quantity)
          : "",
      costPerUnit:
        rec.costPerUnit !== null && rec.costPerUnit !== undefined
          ? String(rec.costPerUnit)
          : "",
      milkPricePerLitre:
        rec.milkPricePerLitre !== null &&
        rec.milkPricePerLitre !== undefined
          ? String(rec.milkPricePerLitre)
          : "40",
      morningYield:
        rec.morningYield !== null && rec.morningYield !== undefined
          ? String(rec.morningYield)
          : "",
      eveningYield:
        rec.eveningYield !== null && rec.eveningYield !== undefined
          ? String(rec.eveningYield)
          : "",
      runningCost:
        rec.runningCost !== null && rec.runningCost !== undefined
          ? String(rec.runningCost)
          : "",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm((prev) => ({
      ...prev,
      date: "",
      morningYield: "",
      eveningYield: "",
      runningCost: "",
    }));
  };

  // --------- Delete record ----------
  const handleDelete = async (id) => {
    if (!window.confirm(t("confirmDeleteRecord"))) return;

    try {
      const res = await fetch(`${API_BASE}/milkfeeds/${id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(data?.message || t("deleteFailedMilkFeed"));

      if (form.cattleId) await loadRecordsForCattle(form.cattleId);
      if (editingId === id) handleCancelEdit();
    } catch (e) {
      console.error("Delete error:", e);
      alert(e.message || t("deleteFailedMilkFeed"));
    }
  };

  // --------- Save (create or update) ----------
  const handleSave = async () => {
    setErr("");
    if (!form.cattleId || !form.date) {
      alert(t("pleaseSelectCattleAndDate"));
      return;
    }

    setSaving(true);

    const payload = {
      cattleId: Number(form.cattleId),
      date: form.date,
      feedType: form.feedType,
      quantity: Number(form.quantity || 0),
      costPerUnit: Number(form.costPerUnit || 0),
      milkPricePerLitre: Number(form.milkPricePerLitre || 0),
      morningYield: Number(form.morningYield || 0),
      eveningYield: Number(form.eveningYield || 0),
      runningCost: Number(form.runningCost || 0),
    };

    try {
      const url = editingId
        ? `${API_BASE}/milkfeeds/${editingId}`
        : `${API_BASE}/milkfeeds`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(data?.message || t("failedToSaveMilkFeed"));

      alert(editingId ? t("recordUpdated") : t("recordSaved"));

      await loadRecordsForCattle(payload.cattleId);
      setEditingId(null);
      setForm((prev) => ({
        ...prev,
        date: "",
        morningYield: "",
        eveningYield: "",
        runningCost: "",
      }));
    } catch (e) {
      console.error("MilkFeed save error:", e);
      setErr(e.message || t("serverErrorMilkFeed"));
    } finally {
      setSaving(false);
    }
  };

  // --------- UI ----------
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1 style={{ color: "#1b5e20", textAlign: "center", marginBottom: 5 }}>
        🐄 {t("dairyFarmManagementTitle")}
      </h1>
      <h2 style={{ color: "#2e7d32", textAlign: "center", marginBottom: 20 }}>
        🥛 {t("milkFeedRecordsTitle")}
      </h2>

      {err && (
        <p style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
          {err}
        </p>
      )}

      {/* FORM */}
      <div style={box}>
        <FormRow>
          <SelectField
            label={t("selectCattleLabel")}
            name="cattleId"
            value={form.cattleId}
            onChange={handleChange}
            options={cattle.map((c) => ({
              value: c.id,
              label: `${c.tagNo} - ${c.name || t("unnamed")}`,
            }))}
          />
          <InputField
            label={t("date")}
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />
          <InputField
            label={t("milkPriceLabel")}
            name="milkPricePerLitre"
            type="number"
            value={form.milkPricePerLitre}
            onChange={handleChange}
            onMic={() => handleVoiceInput("milkPricePerLitre")}
          />
        </FormRow>

        <FormRow>
          <InputField
            label={t("feedType")}
            name="feedType"
            value={form.feedType}
            onChange={handleChange}
            onMic={() => handleVoiceInput("feedType")}
          />
          <InputField
            label={t("quantityKgPerDay")}
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            onMic={() => handleVoiceInput("quantity")}
          />
          <InputField
            label={t("costPerKg")}
            name="costPerUnit"
            type="number"
            value={form.costPerUnit}
            onChange={handleChange}
            onMic={() => handleVoiceInput("costPerUnit")}
          />
          <InputField
            label={t("dailyFeedCost")}
            value={dailyFeedCost.toFixed(2)}
            readOnly
          />
        </FormRow>

        <FormRow>
          <InputField
            label={t("morningYield")}
            name="morningYield"
            type="number"
            value={form.morningYield}
            onChange={handleChange}
            onMic={() => handleVoiceInput("morningYield")}
          />
          <InputField
            label={t("eveningYield")}
            name="eveningYield"
            type="number"
            value={form.eveningYield}
            onChange={handleChange}
            onMic={() => handleVoiceInput("eveningYield")}
          />
          <InputField
            label={t("totalYield")}
            value={totalYield.toFixed(2)}
            readOnly
          />
        </FormRow>

        <FormRow>
          <InputField
            label={t("runningCostLabel")}
            name="runningCost"
            type="number"
            value={form.runningCost}
            onChange={handleChange}
            onMic={() => handleVoiceInput("runningCost")}
          />
          <InputField
            label={t("earningsPerDay")}
            value={earnings.toFixed(2)}
            readOnly
          />
        </FormRow>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button style={btnSave} onClick={handleSave} disabled={saving}>
            {saving
              ? editingId
                ? t("updating")
                : t("saving")
              : editingId
              ? t("updateRecordBtn")
              : t("saveRecordBtn")}
          </button>
          {editingId && (
            <button style={btnCancel} onClick={handleCancelEdit}>
              {t("cancelEdit")}
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div style={box}>
        <h3 style={{ color: "#2e7d32", marginBottom: 10 }}>
          📊 {t("savedRecordsTitle")}{" "}
          {form.cattleId && `(${t("selectedCattleSuffix")})`}
        </h3>
        {loadingRecords ? (
          <p style={{ textAlign: "center" }}>{t("loadingRecords")}</p>
        ) : (
          <RecordsTable
            records={records}
            cattleMap={cattleMap}
            onEdit={handleEdit}
            onDelete={handleDelete}
            t={t}
          />
        )}
      </div>
    </div>
  );
}

/* ---------- Small helper components ---------- */

function FormRow({ children }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 15, marginBottom: 16 }}>
      {children}
    </div>
  );
}

function InputField({ label, onMic, ...props }) {
  return (
    <div style={{ flex: 1, minWidth: 200 }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: "relative" }}>
        <input {...props} style={inputStyle} />
        {onMic && (
          <FaMicrophone
            style={micStyle}
            onClick={onMic}
            title="Speak to fill"
          />
        )}
      </div>
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div style={{ flex: 1, minWidth: 200 }}>
      <label style={labelStyle}>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={inputStyle}
      >
        <option value="">--</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function RecordsTable({ records, cattleMap, onEdit, onDelete, t }) {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {[
            t("date"),
            t("cattleColumn"),
            t("feedType"),
            t("qtyKgPerDayColumn"),
            t("costPerKgColumn"),
            t("feedCostColumn"),
            t("milkPriceColumn"),
            t("totalYieldColumn"),
            t("earningsColumn"),
            t("actions"),
          ].map((h) => (
            <th key={h} style={thStyle}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {records.length === 0 ? (
          <tr>
            <td colSpan="10" style={tdStyle}>
              {t("noRecordsForThisCattle")}
            </td>
          </tr>
        ) : (
          records.map((rec) => {
            const c = cattleMap[rec.cattleId] || {};
            const totalYieldRecord =
              (rec.morningYield || 0) + (rec.eveningYield || 0);
            const feedCostRecord =
              (rec.costPerUnit || 0) * (rec.quantity || 0);
            const earningsRecord =
              rec.earnings != null
                ? rec.earnings
                : totalYieldRecord * (rec.milkPricePerLitre || 0) -
                  feedCostRecord;

            return (
              <tr key={rec.id}>
                <td style={tdStyle}>{rec.date}</td>
                <td style={tdStyle}>
                  {c.tagNo ? `${c.tagNo} - ${c.name}` : rec.cattleId}
                </td>
                <td style={tdStyle}>{rec.feedType}</td>
                <td style={tdStyle}>{rec.quantity}</td>
                <td style={tdStyle}>{rec.costPerUnit}</td>
                <td style={tdStyle}>{feedCostRecord.toFixed(2)}</td>
                <td style={tdStyle}>{rec.milkPricePerLitre}</td>
                <td style={tdStyle}>{totalYieldRecord.toFixed(2)}</td>
                <td style={tdStyle}>{earningsRecord.toFixed(2)}</td>
                <td style={tdStyle}>
                  <button style={btnEdit} onClick={() => onEdit(rec)}>
                    ✏
                  </button>
                  <button style={btnDelete} onClick={() => onDelete(rec.id)}>
                    🗑
                  </button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

/* ---------- Styles ---------- */

const box = {
  background: "white",
  borderRadius: 16,
  padding: 20,
  marginBottom: 20,
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const labelStyle = {
  fontWeight: 600,
  color: "#2e7d32",
  marginBottom: 6,
  display: "block",
};

const inputStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 14,
};

const micStyle = {
  position: "absolute",
  right: 10,
  top: "50%",
  transform: "translateY(-50%)",
  color: "#1b5e20",
  cursor: "pointer",
  fontSize: 18,
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "center",
};

const thStyle = {
  padding: 8,
  background: "#2e7d32",
  color: "white",
  fontWeight: 600,
};

const tdStyle = {
  padding: 8,
  borderBottom: "1px solid #ddd",
  fontSize: 14,
};

const btnSave = {
  background: "#2e7d32",
  color: "white",
  border: "none",
  borderRadius: 10,
  padding: "10px 22px",
  marginRight: 10,
  cursor: "pointer",
  fontWeight: 600,
};

const btnCancel = {
  background: "white",
  color: "#2e7d32",
  border: "1px solid #2e7d32",
  borderRadius: 10,
  padding: "10px 22px",
  cursor: "pointer",
  fontWeight: 600,
};

const btnEdit = {
  background: "#2e7d32",
  color: "white",
  border: "none",
  borderRadius: 6,
  padding: "4px 6px",
  marginRight: 4,
  cursor: "pointer",
};

const btnDelete = {
  background: "#c62828",
  color: "white",
  border: "none",
  borderRadius: 6,
  padding: "4px 6px",
  cursor: "pointer",
};
