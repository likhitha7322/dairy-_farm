// src/components/breedrecord.jsx
import React, { useEffect, useState } from "react";
import { useLanguage } from "../lang/LanguageContext";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000/api";

export default function BreedRecord() {
  const { t } = useLanguage();

  const [cattle, setCattle] = useState([]);
  const [records, setRecords] = useState([]);

  const [form, setForm] = useState({
    cattleId: "",
    serviceDate: "",
    method: "",
    pregnancyStatus: "",
    expectedCalvingDate: "",
    remarks: "",
  });

  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);

  // load cattle list
  useEffect(() => {
    const loadCattle = async () => {
      try {
        const res = await fetch(`${API_BASE}/cattle`);
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || t("failedToLoadCattle"));
        setCattle(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Load cattle error:", e);
        setErr(t("failedToLoadCattleList"));
      }
    };
    loadCattle();
  }, [t]);

  // auto-calc expected calving when Pregnant
  useEffect(() => {
    setForm((prev) => {
      if (!prev.serviceDate || prev.pregnancyStatus !== "Pregnant") {
        if (!prev.expectedCalvingDate) return prev;
        return { ...prev, expectedCalvingDate: "" };
      }

      const d = new Date(prev.serviceDate);
      if (Number.isNaN(d.getTime())) return prev;

      d.setDate(d.getDate() + 280);
      const iso = d.toISOString().slice(0, 10);

      if (iso === prev.expectedCalvingDate) return prev;
      return { ...prev, expectedCalvingDate: iso };
    });
  }, [form.serviceDate, form.pregnancyStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "cattleId" && value) {
      loadRecords(value);
    }
  };

  const loadRecords = async (cattleId) => {
    try {
      const res = await fetch(`${API_BASE}/breeding?cattleId=${cattleId}`);
      const data = await res.json().catch(() => []);
      if (!res.ok)
        throw new Error(data.message || t("failedToLoadBreedingRecords"));
      setRecords(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Load breeding records error:", e);
      setRecords([]);
    }
  };

  const resetFormForSameCattle = () => {
    setForm((prev) => ({
      cattleId: prev.cattleId,
      serviceDate: "",
      method: "",
      pregnancyStatus: "",
      expectedCalvingDate: "",
      remarks: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");

    if (!form.cattleId || !form.serviceDate) {
      setErr(t("selectCattleAndServiceDate"));
      return;
    }

    setSaving(true);
    try {
      const payload = {
        cattleId: Number(form.cattleId),
        serviceDate: form.serviceDate,
        method: form.method || null,
        pregnancyStatus: form.pregnancyStatus || null,
        expectedCalvingDate: form.expectedCalvingDate || null,
        remarks: form.remarks || null,
      };

      let res, data;

      if (editingId) {
        res = await fetch(`${API_BASE}/breeding/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE}/breeding`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      data = await res.json();
      if (!res.ok)
        throw new Error(data.message || t("failedToSaveBreedingRecord"));

      setSuccess(
        editingId ? t("breedingRecordUpdated") : t("breedingRecordSaved")
      );

      if (form.cattleId) await loadRecords(form.cattleId);

      setEditingId(null);
      resetFormForSameCattle();
    } catch (e) {
      console.error("Save breeding error:", e);
      setErr(e.message || t("serverError"));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (rec) => {
    setEditingId(rec.id);
    setForm({
      cattleId: String(rec.cattleId),
      serviceDate: rec.serviceDate || "",
      method: rec.method || "",
      pregnancyStatus: rec.pregnancyStatus || "",
      expectedCalvingDate: rec.expectedCalvingDate || "",
      remarks: rec.remarks || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    resetFormForSameCattle();
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(t("confirmDeleteBreedingRecord"));
    if (!ok) return;

    try {
      const res = await fetch(`${API_BASE}/breeding/${id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(data.message || t("failedToDeleteBreeding"));

      if (form.cattleId) await loadRecords(form.cattleId);
      if (editingId === id) cancelEdit();
    } catch (e) {
      console.error("Delete breeding error:", e);
      alert(e.message || t("errorDeletingBreeding"));
    }
  };

  return (
    <div style={page}>
      <h1 style={title}>🐮 {t("breedingRecordsTitle")}</h1>

      {err && (
        <p style={{ color: "red", textAlign: "center", marginBottom: 8 }}>
          {err}
        </p>
      )}
      {success && (
        <p style={{ color: "green", textAlign: "center", marginBottom: 8 }}>
          {success}
        </p>
      )}

      {/* FORM CARD */}
      <div style={card}>
        <h2 style={cardTitle}>
          {editingId
            ? t("editBreedingRecordTitle")
            : t("addBreedingRecordTitle")}
        </h2>

        <form onSubmit={handleSubmit} style={formGrid}>
          <div style={field}>
            <label style={label}>{t("cattleLabel")} *</label>
            <select
              name="cattleId"
              value={form.cattleId}
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

          <div style={field}>
            <label style={label}>{t("serviceDate")} *</label>
            <input
              type="date"
              name="serviceDate"
              value={form.serviceDate}
              onChange={handleChange}
              style={input}
            />
          </div>

          <div style={field}>
            <label style={label}>{t("method")}</label>
            <select
              name="method"
              value={form.method}
              onChange={handleChange}
              style={input}
            >
              <option value="">{t("selectPlaceholder")}</option>
              <option value="AI">{t("methodAI")}</option>
              <option value="Natural">{t("methodNatural")}</option>
              <option value="Other">{t("methodOther")}</option>
            </select>
          </div>

          <div style={field}>
            <label style={label}>{t("pregnancyStatus")}</label>
            <select
              name="pregnancyStatus"
              value={form.pregnancyStatus}
              onChange={handleChange}
              style={input}
            >
              <option value="">{t("pregStatusNotChecked")}</option>
              <option value="Inseminated">{t("pregStatusInseminated")}</option>
              <option value="Pregnant">{t("pregStatusPregnant")}</option>
              <option value="Not Pregnant">
                {t("pregStatusNotPregnant")}
              </option>
              <option value="Aborted">{t("pregStatusAborted")}</option>
              <option value="Delivered">{t("pregStatusDelivered")}</option>
            </select>
          </div>

          <div style={field}>
            <label style={label}>{t("expectedCalvingDate")}</label>
            <input
              type="date"
              name="expectedCalvingDate"
              value={form.expectedCalvingDate}
              readOnly
              style={{
                ...input,
                backgroundColor: "#f5f5f5",
                cursor: "not-allowed",
              }}
            />
            <span style={hint}>{t("expectedCalvingHint")}</span>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={label}>{t("remarks")}</label>
            <textarea
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              style={textarea}
              placeholder={t("remarksPlaceholder")}
            />
          </div>

          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            <button type="submit" style={btn} disabled={saving}>
              {saving
                ? editingId
                  ? t("updatingBreeding")
                  : t("savingBreeding")
                : editingId
                ? t("updateBreedingBtn")
                : t("saveBreedingBtn")}
            </button>

            {editingId && (
              <button type="button" onClick={cancelEdit} style={cancelBtn}>
                ✖ {t("cancelEdit")}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* LIST CARD */}
      <div style={{ ...card, marginTop: 20, marginBottom: 30 }}>
        <h2 style={cardTitle}>{t("breedingHistoryTitle")}</h2>

        {!form.cattleId ? (
          <p style={muted}>{t("selectCattleToViewBreeding")}</p>
        ) : !records.length ? (
          <p style={muted}>{t("noBreedingRecordsForCattle")}</p>
        ) : (
          <div style={{ overflowX: "auto", marginTop: 10 }}>
            <table style={table}>
              <thead>
                <tr style={theadRow}>
                  <th style={th}>{t("serviceDate")}</th>
                  <th style={th}>{t("method")}</th>
                  <th style={th}>{t("pregnancyStatus")}</th>
                  <th style={th}>{t("expectedCalving")}</th>
                  <th style={th}>{t("remarks")}</th>
                  <th style={th}>{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {records.map((b) => (
                  <tr key={b.id} style={tbodyRow}>
                    <td style={td}>{b.serviceDate || "-"}</td>
                    <td style={td}>{b.method || "-"}</td>
                    <td style={td}>{b.pregnancyStatus || "-"}</td>
                    <td style={td}>{b.expectedCalvingDate || "-"}</td>
                    <td style={{ ...td, maxWidth: 180, overflow: "hidden" }}>
                      {b.remarks || "-"}
                    </td>
                    <td style={td}>
                      <button
                        onClick={() => handleEdit(b)}
                        style={editBtn}
                        title={t("editRecordTitle")}
                      >
                        ✏
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        style={deleteBtn}
                        title={t("deleteRecordTitle")}
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- styles ---------- */
const page = {
  maxWidth: 900,
  margin: "0 auto",
  padding: 20,
  fontFamily: "Poppins, system-ui, sans-serif",
};

const title = {
  textAlign: "center",
  color: "#1b5e20",
  marginBottom: 16,
};

const card = {
  background: "white",
  borderRadius: 16,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  padding: 18,
};

const cardTitle = {
  color: "#2e7d32",
  fontSize: 18,
  fontWeight: 700,
  marginBottom: 12,
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 14,
};

const field = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const label = {
  fontSize: 13,
  fontWeight: 600,
  color: "#2e7d32",
};

const input = {
  padding: "8px 10px",
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 14,
};

const textarea = {
  padding: "8px 10px",
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 14,
  width: "100%",
  minHeight: 70,
};

const hint = {
  fontSize: 11,
  color: "#777",
  marginTop: 2,
};

const btn = {
  background: "#2e7d32",
  color: "white",
  border: "none",
  borderRadius: 10,
  padding: "10px 24px",
  fontWeight: 600,
  cursor: "pointer",
  fontSize: 15,
};

const cancelBtn = {
  background: "white",
  color: "#2e7d32",
  border: "1px solid #2e7d32",
  borderRadius: 8,
  padding: "8px 16px",
  fontWeight: 600,
  cursor: "pointer",
  marginLeft: 10,
};

const muted = {
  color: "#777",
  fontSize: 14,
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 13,
};

const theadRow = {
  background: "#2e7d32",
  color: "white",
};

const th = {
  padding: 8,
};

const td = {
  padding: 8,
  borderBottom: "1px solid #eee",
  textAlign: "center",
};

const tbodyRow = {
  background: "white",
};

const editBtn = {
  background: "white",
  border: "1px solid #2e7d32",
  borderRadius: 6,
  color: "#2e7d32",
  fontSize: 14,
  padding: "3px 6px",
  marginRight: 4,
  cursor: "pointer",
};

const deleteBtn = {
  background: "white",
  border: "1px solid #c62828",
  borderRadius: 6,
  color: "#c62828",
  fontSize: 14,
  padding: "3px 6px",
  cursor: "pointer",
};
