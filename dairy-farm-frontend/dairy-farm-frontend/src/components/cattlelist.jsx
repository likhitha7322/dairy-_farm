// src/components/CattleList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useLanguage } from "../lang/LanguageContext";
// keep this if AnimatedBackground is just for side effects / styles
import "./AnimatedBackground";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000/api";

export default function CattleList() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [cattles, setCattles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // load list
  const load = async () => {
    try {
      const res = await fetch(`${API_BASE}/cattle`);
      const data = await res.json();
      if (!res.ok) throw Error(data?.message);
      setCattles(data);
    } catch (e) {
      console.error(e);
      setErr(t("failedToLoadCattleList"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // we don't need to re-run on language change, only when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // delete
  const handleDelete = async (id, name) => {
    if (
      !window.confirm(`${t("confirmDeleteCattle")} "${name || t("unnamed")}"?`)
    )
      return;

    setDeletingId(id);

    try {
      const res = await fetch(`${API_BASE}/cattle/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw Error(data?.message);
      setCattles((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      console.error(e);
      alert(t("deleteFailed"));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    // ❗ NO <Layout> here – Layout is already wrapped in App.jsx
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        {t("cattleListTitle")}
      </h2>

      {loading && <p>{t("loading")}</p>}
      {err && <p style={{ color: "red" }}>{err}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {cattles.map((cattle) => (
          <div
            key={cattle.id}
            style={{
              background: "white",
              padding: 16,
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              border: "1px solid #c8e6c9",
            }}
          >
            <div
              onClick={() => navigate(`/cattle/${cattle.id}`)}
              style={{ cursor: "pointer" }}
            >
              <h3 style={{ color: "#2e7d32" }}>{cattle.tagNo}</h3>
              <p>{cattle.name || t("unnamed")}</p>
              <p style={{ fontSize: 13, color: "#666" }}>
                {cattle.breed || t("breedNotSet")}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: 12,
              }}
            >
              <button
                onClick={() => navigate(`/cattle/${cattle.id}/edit`)}
                style={btnEdit}
                title={t("edit")}
              >
                <FaEdit />
              </button>

              <button
                disabled={deletingId === cattle.id}
                onClick={() =>
                  handleDelete(cattle.id, cattle.name || cattle.tagNo)
                }
                style={btnDelete}
                title={t("deleteShort")}
              >
                {deletingId === cattle.id ? "⏳" : <FaTrash />}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <button onClick={() => navigate("/cattle/register")} style={btnAdd}>
          + {t("addCattle")}
        </button>
      </div>
    </div>
  );
}

const btnEdit = {
  background: "#1b5e20",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: 32,
  height: 32,
  cursor: "pointer",
  fontSize: 14,
};

const btnDelete = {
  ...btnEdit,
  background: "#28c69e",
};

const btnAdd = {
  background: "#2e7d32",
  color: "white",
  border: "none",
  borderRadius: 12,
  padding: "10px 20px",
  cursor: "pointer",
};
