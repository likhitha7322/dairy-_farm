// src/components/CattleDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../lang/LanguageContext";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000/api";

export default function CattleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [cattle, setCattle] = useState(null);
  const [milkRecords, setMilkRecords] = useState([]);
  const [breedingRecords, setBreedingRecords] = useState([]);
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setErr("");

      try {
        // 1) Basic cattle details
        const resCattle = await fetch(`${API_BASE}/cattle/${id}`);
        const dataCattle = await resCattle.json().catch(() => null);
        if (!resCattle.ok) {
          throw new Error(dataCattle?.message || "Failed to load cattle");
        }
        setCattle(dataCattle);

        // 2) Milk + Feed records for this cattle
        const resMilk = await fetch(`${API_BASE}/milkfeeds/cattle/${id}`);
        const dataMilk = await resMilk.json().catch(() => []);
        setMilkRecords(resMilk.ok && Array.isArray(dataMilk) ? dataMilk : []);

        // 3) Breeding records
        try {
          const resBreed = await fetch(`${API_BASE}/breeding?cattleId=${id}`);
          const dataBreed = await resBreed.json().catch(() => []);
          setBreedingRecords(
            resBreed.ok && Array.isArray(dataBreed) ? dataBreed : []
          );
        } catch {
          setBreedingRecords([]);
        }

        // 4) Health records
        const resHealth = await fetch(`${API_BASE}/health?cattleId=${id}`);
        const dataHealth = await resHealth.json().catch(() => []);
        setHealthRecords(
          resHealth.ok && Array.isArray(dataHealth) ? dataHealth : []
        );
      } catch (e) {
        console.error("Cattle details load error:", e);
        setErr(e.message || "Failed to load cattle details");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  // -------- notes (extra info) --------
  const extraNotes = useMemo(() => {
    if (!cattle || !cattle.notes) return {};
    try {
      return JSON.parse(cattle.notes);
    } catch {
      return {};
    }
  }, [cattle]);

  // -------- summary from milk records --------
  const milkSummary = useMemo(() => {
    if (!milkRecords.length) return null;

    let totalMilk = 0;
    let totalIncome = 0;
    let totalFeedCost = 0;
    let totalProfit = 0;

    milkRecords.forEach((r) => {
      const morning = Number(r.morningYield ?? 0);
      const evening = Number(r.eveningYield ?? 0);
      const totalYield =
        r.totalYield != null ? Number(r.totalYield) : morning + evening;

      const milkPrice = Number(r.milkPricePerLitre ?? 0);
      const milkIncome =
        r.milkIncome != null ? Number(r.milkIncome) : totalYield * milkPrice;

      const feedCost =
        r.feedTotalCost != null
          ? Number(r.feedTotalCost)
          : Number(r.costPerUnit ?? 0) * Number(r.quantity ?? 0);

      const profit =
        r.earnings != null ? Number(r.earnings) : milkIncome - feedCost;

      totalMilk += totalYield;
      totalIncome += milkIncome;
      totalFeedCost += feedCost;
      totalProfit += profit;
    });

    const days = milkRecords.length;

    return {
      totalMilk,
      totalIncome,
      totalFeedCost,
      totalProfit,
      avgMilkPerDay: days ? totalMilk / days : 0,
    };
  }, [milkRecords]);

  // ------- chart data (tiny bar chart) -------
  const chartData = useMemo(() => {
    if (!milkRecords.length) return { milk: [], profit: [] };

    const milk = [];
    const profit = [];

    milkRecords.forEach((r) => {
      const morning = Number(r.morningYield ?? 0);
      const evening = Number(r.eveningYield ?? 0);
      const totalYield =
        r.totalYield != null ? Number(r.totalYield) : morning + evening;

      const milkPrice = Number(r.milkPricePerLitre ?? 0);
      const milkIncome =
        r.milkIncome != null ? Number(r.milkIncome) : totalYield * milkPrice;

      const feedCost =
        r.feedTotalCost != null
          ? Number(r.feedTotalCost)
          : Number(r.costPerUnit ?? 0) * Number(r.quantity ?? 0);

      const profitVal =
        r.earnings != null ? Number(r.earnings) : milkIncome - feedCost;

      milk.push({ date: r.date, value: totalYield });
      profit.push({ date: r.date, value: profitVal });
    });

    return { milk, profit };
  }, [milkRecords]);

  const maxMilk = Math.max(...chartData.milk.map((d) => d.value), 1);
  const maxProfit = Math.max(...chartData.profit.map((d) => d.value), 1);

  // ------- delete / edit / export -------

  const handleDeleteMilk = async (recordId) => {
    if (!window.confirm(t("confirmDeleteMilk") || "Delete this record?")) return;

    try {
      const res = await fetch(`${API_BASE}/milkfeeds/${recordId}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Failed to delete record");
      setMilkRecords((prev) => prev.filter((r) => r.id !== recordId));
    } catch (e) {
      console.error("Delete milk record error:", e);
      alert(e.message || "Error deleting record");
    }
  };

  const handleEditMilk = (record) => {
    navigate("/milkFeedpage", {
      state: { fromDetails: true, cattleId: record.cattleId || Number(id) },
    });
  };

  const handleDownloadCSV = () => {
    if (!milkRecords.length) {
      alert(t("noMilkFeedRecords"));
      return;
    }

    const header = [
      "Date",
      "Morning(L)",
      "Evening(L)",
      "Total(L)",
      "MilkPrice(₹/L)",
      "MilkIncome(₹)",
      "FeedType",
      "FeedQty(kg)",
      "FeedCost(₹)",
      "Profit(₹)",
    ];

    const rows = milkRecords.map((r) => {
      const morning = Number(r.morningYield ?? 0);
      const evening = Number(r.eveningYield ?? 0);
      const totalYield =
        r.totalYield != null ? Number(r.totalYield) : morning + evening;
      const milkPrice = Number(r.milkPricePerLitre ?? 0);
      const milkIncome =
        r.milkIncome != null ? Number(r.milkIncome) : totalYield * milkPrice;
      const feedCost =
        r.feedTotalCost != null
          ? Number(r.feedTotalCost)
          : Number(r.costPerUnit ?? 0) * Number(r.quantity ?? 0);
      const profit =
        r.earnings != null ? Number(r.earnings) : milkIncome - feedCost;

      return [
        r.date,
        morning.toFixed(2),
        evening.toFixed(2),
        totalYield.toFixed(2),
        milkPrice.toFixed(2),
        milkIncome.toFixed(2),
        r.feedType || "",
        Number(r.quantity ?? 0).toFixed(2),
        feedCost.toFixed(2),
        profit.toFixed(2),
      ];
    });

    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cattle_${id}_milk_feed.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  // ------- loading / error UI WITHOUT Layout -------

  if (loading) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        {t("loading")}
      </div>
    );
  }

  if (err) {
    return (
      <div style={{ padding: 20, textAlign: "center", color: "red" }}>
        {err}
      </div>
    );
  }

  if (!cattle) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        {t("cattleNotFound")}
      </div>
    );
  }

  // ------- MAIN UI (no Layout wrapper) -------

  return (
    <div style={page}>
      {/* Top controls */}
      <div style={topBar}>
        <button onClick={() => navigate("/cattle")} style={backBtn}>
          ← {t("backToCattleList")}
        </button>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={handleDownloadCSV} style={smallBtnOutline}>
            ⬇ {t("downloadCsv")}
          </button>
          <button onClick={handlePrint} style={smallBtn}>
            🖨 {t("printProfile")}
          </button>
        </div>
      </div>

      {/* Profile card */}
      <section style={profileCard}>
        <div style={{ flex: 1 }}>
          <h1 style={profileName}>
            {cattle.tagNo} — {cattle.name}
          </h1>
          <p style={profileLine}>
            <b>{t("breed")}:</b> {cattle.breed || "-"}
          </p>
          <p style={profileLine}>
            <b>{t("dob")}:</b> {cattle.dob || "-"}
          </p>
          <p style={profileLine}>
            <b>{t("status")}:</b> {cattle.status || "-"}
          </p>
        </div>

        <div style={chipRow}>
          {extraNotes.avgMilkYield && (
            <Chip label={t("avgMilk")} value={`${extraNotes.avgMilkYield} L/day`} />
          )}
          {extraNotes.pregnancyStatus && (
            <Chip label={t("pregnancy")} value={extraNotes.pregnancyStatus} />
          )}
          {extraNotes.lastBreedingDate && (
            <Chip label={t("lastBreeding")} value={extraNotes.lastBreedingDate} />
          )}
          {extraNotes.age && <Chip label={t("age")} value={extraNotes.age} />}
        </div>
      </section>

      {/* Milk summary row */}
      {milkSummary && (
        <div style={summaryRow}>
          <SummaryBox
            label={t("totalMilk")}
            value={`${milkSummary.totalMilk.toFixed(2)} L`}
          />
          <SummaryBox
            label={t("milkIncome")}
            value={`₹ ${milkSummary.totalIncome.toFixed(2)}`}
          />
          <SummaryBox
            label={t("feedCost")}
            value={`₹ ${milkSummary.totalFeedCost.toFixed(2)}`}
          />
          <SummaryBox
            label={t("profit")}
            value={`₹ ${milkSummary.totalProfit.toFixed(2)}`}
          />
          <SummaryBox
            label={t("avgMilkPerDay")}
            value={`${milkSummary.avgMilkPerDay.toFixed(2)} L`}
          />
        </div>
      )}

      {/* Milk & Feed section */}
      <section style={section}>
        <div style={sectionHeader}>
          <h2 style={sectionTitle}>
            🥛 {t("milkRecord")} &amp; {t("feedRecord")}
          </h2>
          <button
            onClick={() => navigate("/milkFeedpage")}
            style={smallLinkBtn}
          >
            {t("openMilkFeedPage")}
          </button>
        </div>

        {!milkRecords.length ? (
          <p style={{ color: "#777" }}>{t("noMilkFeedRecords")}</p>
        ) : (
          <>
            {/* Charts */}
            <div style={chartsRow}>
              <ChartCard title={t("milkYieldChartTitle")}>
                {chartData.milk.map((d) => (
                  <ChartBar
                    key={`milk-${d.date}`}
                    label={d.date}
                    value={d.value}
                    max={maxMilk}
                    unit="L"
                  />
                ))}
              </ChartCard>

              <ChartCard title={t("dailyProfitChartTitle")}>
                {chartData.profit.map((d) => (
                  <ChartBar
                    key={`profit-${d.date}`}
                    label={d.date}
                    value={d.value}
                    max={maxProfit}
                    unit="₹"
                  />
                ))}
              </ChartCard>
            </div>

            {/* Table */}
            <div style={tableWrapper}>
              <table style={table}>
                <thead>
                  <tr style={{ background: "#2e7d32", color: "white" }}>
                    <th style={th}>{t("date")}</th>
                    <th style={th}>{t("morningLitres")}</th>
                    <th style={th}>{t("eveningLitres")}</th>
                    <th style={th}>{t("totalLitres")}</th>
                    <th style={th}>{t("milkPricePerLitre")}</th>
                    <th style={th}>{t("milkIncome")}</th>
                    <th style={th}>{t("feedType")}</th>
                    <th style={th}>{t("qtyKg")}</th>
                    <th style={th}>{t("feedCostLabel")}</th>
                    <th style={th}>{t("profit")}</th>
                    <th style={th}>{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {milkRecords.map((r) => {
                    const morning = Number(r.morningYield ?? 0);
                    const evening = Number(r.eveningYield ?? 0);
                    const totalYield =
                      r.totalYield != null ? Number(r.totalYield) : morning + evening;

                    const milkPrice = Number(r.milkPricePerLitre ?? 0);
                    const milkIncome =
                      r.milkIncome != null
                        ? Number(r.milkIncome)
                        : totalYield * milkPrice;

                    const feedCost =
                      r.feedTotalCost != null
                        ? Number(r.feedTotalCost)
                        : Number(r.costPerUnit ?? 0) * Number(r.quantity ?? 0);

                    const profit =
                      r.earnings != null
                        ? Number(r.earnings)
                        : milkIncome - feedCost;

                    return (
                      <tr key={r.id} style={row}>
                        <td style={td}>{r.date}</td>
                        <td style={td}>{morning.toFixed(2)}</td>
                        <td style={td}>{evening.toFixed(2)}</td>
                        <td style={td}>{totalYield.toFixed(2)}</td>
                        <td style={td}>{milkPrice.toFixed(2)}</td>
                        <td style={td}>{milkIncome.toFixed(2)}</td>
                        <td style={td}>{r.feedType || "-"}</td>
                        <td style={td}>{Number(r.quantity ?? 0).toFixed(2)}</td>
                        <td style={td}>{feedCost.toFixed(2)}</td>
                        <td style={td}>{profit.toFixed(2)}</td>
                        <td style={td}>
                          <button
                            onClick={() => handleEditMilk(r)}
                            style={tinyBtnOutline}
                          >
                            {t("edit")}
                          </button>
                          <button
                            onClick={() => handleDeleteMilk(r.id)}
                            style={tinyBtnDanger}
                          >
                            {t("deleteShort")}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      {/* Breeding section */}
      <section style={section}>
        <h2 style={sectionTitle}>🐄 {t("breedingHistoryTitle")}</h2>
        {!breedingRecords.length ? (
          <p style={{ color: "#777" }}>{t("noBreedingRecords")}</p>
        ) : (
          <div style={tableWrapper}>
            <table style={table}>
              <thead>
                <tr style={{ background: "#2e7d32", color: "white" }}>
                  <th style={th}>{t("serviceDate")}</th>
                  <th style={th}>{t("method")}</th>
                  <th style={th}>{t("pregnancyStatus")}</th>
                  <th style={th}>{t("expectedCalving")}</th>
                  <th style={th}>{t("actualCalving")}</th>
                  <th style={th}>{t("remarks")}</th>
                </tr>
              </thead>
              <tbody>
                {breedingRecords.map((b) => (
                  <tr key={b.id} style={row}>
                    <td style={td}>{b.serviceDate || b.service_date}</td>
                    <td style={td}>{b.method || "-"}</td>
                    <td style={td}>{b.pregnancyStatus || "-"}</td>
                    <td style={td}>{b.expectedCalvingDate || "-"}</td>
                    <td style={td}>{b.calvingDate || "-"}</td>
                    <td style={td}>{b.remarks || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Health section */}
      <section style={{ ...section, marginBottom: 30 }}>
        <h2 style={sectionTitle}>🩺 {t("healthRecordsTitle")}</h2>
        {!healthRecords.length ? (
          <p style={{ color: "#777" }}>{t("noHealthRecords")}</p>
        ) : (
          <div style={healthList}>
            {healthRecords.map((h) => (
              <div key={h.id} style={healthCard}>
                <p style={smallP}>
                  <b>{t("recordedOn")}:</b>{" "}
                  {h.createdAt
                    ? new Date(h.createdAt).toLocaleDateString()
                    : "-"}
                </p>
                {h.vaccinationDate && (
                  <p style={smallP}>
                    <b>{t("vaccination")}:</b> {h.vaccinationDate} ({t("next")}:
                    {h.nextVaccinationDate || "-"})
                  </p>
                )}
                {h.dewormingDate && (
                  <p style={smallP}>
                    <b>{t("deworming")}:</b> {h.dewormingDate} ({t("next")}:
                    {h.nextDewormingDate || "-"})
                  </p>
                )}
                {(h.illness || h.illnessStartDate || h.severityLevel) && (
                  <p style={smallP}>
                    <b>{t("illness")}:</b> {h.illness || "-"}{" "}
                    {h.illnessStartDate &&
                      `${t("since")} ${h.illnessStartDate} `}
                    {h.severityLevel &&
                      `(${t("severity")}: ${h.severityLevel})`}
                  </p>
                )}
                {h.illnessRemarks && (
                  <p style={smallP}>
                    <b>{t("illnessRemarks")}:</b> {h.illnessRemarks}
                  </p>
                )}
                {h.checkupDate && (
                  <p style={smallP}>
                    <b>{t("checkupDate")}:</b> {h.checkupDate}
                  </p>
                )}
                {h.remarks && (
                  <p style={smallP}>
                    <b>{t("checkupRemarks")}:</b> {h.remarks}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ---------- small components ---------- */

function Chip({ label, value }) {
  return (
    <div style={chip}>
      <span style={{ fontSize: 11, color: "#558b2f" }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#1b5e20" }}>
        {value}
      </span>
    </div>
  );
}

function SummaryBox({ label, value }) {
  return (
    <div style={summaryBox}>
      <div style={{ fontSize: 11, color: "#558b2f" }}>{label}</div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "#1b5e20",
          marginTop: 2,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div style={chartCard}>
      <div style={chartTitle}>{title}</div>
      <div style={chartBody}>{children}</div>
    </div>
  );
}

function ChartBar({ label, value, max, unit }) {
  const width = max ? Math.max((value / max) * 100, 5) : 0;
  return (
    <div style={chartRow}>
      <span style={chartLabel}>{label}</span>
      <div style={chartBarBg}>
        <div style={{ ...chartBarFill, width: `${width}%` }} />
      </div>
      <span style={chartValue}>
        {value.toFixed(1)} {unit}
      </span>
    </div>
  );
}

/* ---------- styles ---------- */

const page = {
  maxWidth: 1000,
  margin: "0 auto",
  padding: 18,
  fontFamily: "Poppins, system-ui, sans-serif",
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
};

const backBtn = {
  border: "none",
  background: "transparent",
  color: "#2e7d32",
  cursor: "pointer",
  fontWeight: 600,
};

const smallBtn = {
  padding: "6px 12px",
  borderRadius: 999,
  border: "none",
  background: "#2e7d32",
  color: "white",
  fontSize: 12,
  cursor: "pointer",
  fontWeight: 600,
};

const smallBtnOutline = {
  padding: "6px 12px",
  borderRadius: 999,
  border: "1px solid #2e7d32",
  background: "white",
  color: "#2e7d32",
  fontSize: 12,
  cursor: "pointer",
  fontWeight: 600,
};

const smallLinkBtn = {
  padding: "4px 10px",
  borderRadius: 999,
  border: "none",
  background: "transparent",
  color: "#1e88e5",
  fontSize: 12,
  cursor: "pointer",
  fontWeight: 600,
};

const profileCard = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  background: "white",
  borderRadius: 18,
  padding: 16,
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
};

const profileName = {
  color: "#1b5e20",
  margin: 0,
  fontSize: 20,
};

const profileLine = {
  margin: "2px 0",
  color: "#555",
  fontSize: 14,
};

const chipRow = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  minWidth: 180,
};

const chip = {
  background: "#E8F5E9",
  borderRadius: 999,
  padding: "6px 12px",
  display: "flex",
  flexDirection: "column",
};

const summaryRow = {
  marginTop: 12,
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const summaryBox = {
  background: "#F1F8E9",
  borderRadius: 12,
  padding: "8px 12px",
  minWidth: 130,
};

const section = {
  marginTop: 24,
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 6,
};

const sectionTitle = {
  color: "#2e7d32",
  margin: 0,
};

const tableWrapper = {
  background: "white",
  borderRadius: 14,
  boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
  padding: 10,
  overflowX: "auto",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 13,
  textAlign: "center",
};

const th = {
  padding: 8,
};

const td = {
  padding: 8,
  color: "#444",
};

const row = {
  borderBottom: "1px solid #eee",
};

const tinyBtnOutline = {
  padding: "3px 6px",
  fontSize: 11,
  borderRadius: 6,
  border: "1px solid #2e7d32",
  background: "white",
  color: "#2e7d32",
  cursor: "pointer",
  marginRight: 4,
};

const tinyBtnDanger = {
  padding: "3px 6px",
  fontSize: 11,
  borderRadius: 6,
  border: "1px solid #c62828",
  background: "white",
  color: "#c62828",
  cursor: "pointer",
};

const healthList = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const healthCard = {
  background: "white",
  borderRadius: 14,
  padding: 12,
  boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
};

const smallP = {
  margin: "2px 0",
  color: "#555",
  fontSize: 13,
};

/* charts */

const chartsRow = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 10,
  marginBottom: 12,
};

const chartCard = {
  background: "white",
  borderRadius: 14,
  boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
  padding: 10,
};

const chartTitle = {
  fontSize: 13,
  fontWeight: 600,
  color: "#2e7d32",
  marginBottom: 4,
};

const chartBody = {
  maxHeight: 220,
  overflowY: "auto",
};

const chartRow = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  marginBottom: 4,
};

const chartLabel = {
  minWidth: 80,
  fontSize: 11,
  color: "#555",
};

const chartBarBg = {
  flex: 1,
  height: 8,
  borderRadius: 999,
  background: "#e0e0e0",
  overflow: "hidden",
};

const chartBarFill = {
  height: "100%",
  borderRadius: 999,
  background: "#66bb6a",
};

const chartValue = {
  minWidth: 60,
  fontSize: 11,
  textAlign: "right",
  color: "#444",
};
