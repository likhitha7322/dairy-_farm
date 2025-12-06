// src/components/dashboard.jsx
import React, { useEffect, useState } from "react";
import { GiCow } from "react-icons/gi";
import { FaTint, FaRupeeSign, FaHeartbeat } from "react-icons/fa";
import { useLanguage } from "../lang/LanguageContext";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000/api";

export default function Dashboard() {
  const { t } = useLanguage();

  // helper so we don't see raw keys like "healthSnapshot"
  const tr = (key, fallback) => {
    const val = t(key);
    return !val || val === key ? fallback : val;
  };

  const [stats, setStats] = useState({
    totalCattle: 0,
    todayMilk: 0,
    todayIncome: 0,
    todayCosts: 0,
    todayProfit: 0,
    monthMilk: 0,
    monthIncome: 0,
    monthCosts: 0,
    monthProfit: 0,
  });

  const [healthSnapshot, setHealthSnapshot] = useState([]);
  const [err, setErr] = useState("");

  // 🔔 Reminders + cow lists
  const [reminders, setReminders] = useState({
    missingMilkFeed: false,
    dueVaccinationCount: 0,
    breedingFollowUpCount: 0,
    missingMilkCattle: [],
    vaccinationDueCattle: [],
    breedingFollowUps: [],
  });

  useEffect(() => {
    const load = async () => {
      try {
        let cattleList = [];
        let milkList = [];
        let healthList = [];

        // ---------- load cattle ----------
        try {
          const res = await fetch(`${API_BASE}/cattle`);
          const json = await res.json().catch(() => null);
          if (res.ok && Array.isArray(json)) {
            cattleList = json;
          } else if (res.ok && json && Array.isArray(json.data)) {
            cattleList = json.data;
          }
        } catch (e) {
          console.warn("Failed to load cattle:", e);
        }

        // ---------- load ALL milk-feed records ----------
        try {
          const res = await fetch(`${API_BASE}/milkfeeds`);
          const json = await res.json().catch(() => null);
          if (res.ok && Array.isArray(json)) {
            milkList = json;
          } else if (res.ok && json && Array.isArray(json.data)) {
            milkList = json.data;
          }
        } catch (e) {
          console.warn("Failed to load milk-feed:", e);
        }

        // ---------- load health records ----------
        try {
          const res = await fetch(`${API_BASE}/health`);
          const json = await res.json().catch(() => null);
          if (res.ok && Array.isArray(json)) {
            healthList = json;
          } else if (res.ok && json && Array.isArray(json.data)) {
            healthList = json.data;
          }
        } catch (e) {
          console.warn("Failed to load health records:", e);
        }

        // ---------- compute MILK + MONEY stats ----------
        const today = new Date();
        const todayIso = today.toISOString().slice(0, 10);
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

        let todayMilk = 0;
        let todayIncome = 0;
        let todayCosts = 0;
        let monthMilk = 0;
        let monthIncome = 0;
        let monthCosts = 0;

        milkList.forEach((rec) => {
          const dateSrc = rec.date || rec.recordDate || rec.createdAt;
          if (!dateSrc) return;
          const d = new Date(dateSrc);
          if (isNaN(d.getTime())) return;
          const dateStr = d.toISOString().slice(0, 10);

          const morning = Number(
            rec.morningYield ?? rec.morningMilk ?? rec.morning ?? 0
          );
          const evening = Number(
            rec.eveningYield ?? rec.eveningMilk ?? rec.evening ?? 0
          );
          const totalYield =
            rec.totalYield != null
              ? Number(rec.totalYield)
              : morning + evening;

          const milkPrice = Number(
            rec.milkPricePerLitre ?? rec.milkPrice ?? 0
          );

          const feedCost = Number(
            rec.feedTotalCost ??
              rec.feedCost ??
              (rec.costPerUnit ?? 0) * (rec.quantity ?? 0)
          );

          const runningCost = Number(rec.runningCost ?? rec.otherCosts ?? 0);

          const milkIncome = Number(
            rec.milkIncome ?? totalYield * milkPrice
          );
          const totalCost = feedCost + runningCost;

          // today
          if (dateStr === todayIso) {
            todayMilk += totalYield;
            todayIncome += milkIncome;
            todayCosts += totalCost;
          }

          // this month
          if (d >= monthStart && d <= today) {
            monthMilk += totalYield;
            monthIncome += milkIncome;
            monthCosts += totalCost;
          }
        });

        const todayProfit = todayIncome - todayCosts;
        const monthProfit = monthIncome - monthCosts;

        // ---------- compute HEALTH snapshot ----------
        const lastByCattle = new Map();
        healthList.forEach((h) => {
          const cid = h.cattleId || h.cowId || h.cattle_id;
          if (!cid) return;
          const dateSrc = h.date || h.visitDate || h.checkDate || h.createdAt;
          const d = dateSrc ? new Date(dateSrc) : null;
          const prev = lastByCattle.get(cid);
          if (!prev || (d && d > prev._date)) {
            lastByCattle.set(cid, { ...h, _date: d });
          }
        });

        const healthCards = Array.from(lastByCattle.entries()).map(
          ([cid, rec]) => {
            const cow =
              cattleList.find(
                (c) =>
                  c.id === cid ||
                  c.cattleId === cid ||
                  c.tagNumber === cid ||
                  c.earTag === cid
              ) || {};
            const label =
              cow.name ||
              cow.tagNumber ||
              cow.earTag ||
              `Cattle ${String(cid).slice(-4)}`;
            const problem =
              rec.issue ||
              rec.disease ||
              rec.condition ||
              rec.reason ||
              "Routine check";
            const status =
              rec.status ||
              rec.recoveryStatus ||
              rec.outcome ||
              "Under observation";

            const dateLabel = rec._date
              ? rec._date.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                })
              : "—";

            return {
              cattleLabel: label,
              lastDate: dateLabel,
              problem,
              status,
            };
          }
        );

        // newest first, max 4
        healthCards.sort((a, b) => (a.lastDate < b.lastDate ? 1 : -1));

        setStats({
          totalCattle: cattleList.length,
          todayMilk,
          todayIncome,
          todayCosts,
          todayProfit,
          monthMilk,
          monthIncome,
          monthCosts,
          monthProfit,
        });

        setHealthSnapshot(healthCards.slice(0, 4));
        setErr("");

        // 🔔 load reminders from backend
        try {
          const rRes = await fetch(`${API_BASE}/reminders`);
          const rJson = await rRes.json().catch(() => null);
          if (rRes.ok && rJson && rJson.success) {
            setReminders({
              missingMilkFeed: !!rJson.missingMilkFeed,
              dueVaccinationCount: rJson.dueVaccinationCount || 0,
              breedingFollowUpCount: rJson.breedingFollowUpCount || 0,
              missingMilkCattle: rJson.missingMilkCattle || [],
              vaccinationDueCattle: rJson.vaccinationDueCattle || [],
              breedingFollowUps: rJson.breedingFollowUps || [],
            });
          }
        } catch (remErr) {
          console.warn("Failed to load reminders:", remErr);
        }
      } catch (e) {
        console.error("Dashboard error:", e);
        setErr(tr("failedToLoadDashboard", "Error loading dashboard"));
      }
    };

    load();
  }, [t]);

  return (
    <div style={pageWrapper}>
      <div style={container}>
        {/* Header */}
        <header style={headerRow}>
          <div>
            <h1 style={title}>
              {tr("dashboardTitle", "Dairy Farm Dashboard")}
            </h1>
            <p style={subtitle}>
              {tr(
                "dashboardSubtitle",
                "Milk, profit and cattle health overview."
              )}
            </p>
          </div>
        </header>

        {/* 🔔 ALERT STRIP WITH COW LISTS */}
        <div style={alertsWrapper}>
          {reminders.missingMilkFeed && (
            <div style={{ ...alertBase, ...alertWarning }}>
              <div>
                ⚠️ You have not entered today&apos;s{" "}
                <strong>milk & feed record</strong> for all cattle.
                Please update it in the Milk & Feed page.
              </div>
              {reminders.missingMilkCattle?.length > 0 && (
                <ul style={alertList}>
                  {reminders.missingMilkCattle.slice(0, 3).map((c) => (
                    <li key={c.id}>{c.label}</li>
                  ))}
                  {reminders.missingMilkCattle.length > 3 && (
                    <li>
                      + {reminders.missingMilkCattle.length - 3} more
                      cattle
                    </li>
                  )}
                </ul>
              )}
            </div>
          )}

          {reminders.dueVaccinationCount > 0 && (
            <div style={{ ...alertBase, ...alertDanger }}>
              <div>
                💉 {reminders.dueVaccinationCount} cattle have{" "}
                <strong>due / overdue vaccination</strong>. Please check
                the Health Records page.
              </div>
              {reminders.vaccinationDueCattle?.length > 0 && (
                <ul style={alertList}>
                  {reminders.vaccinationDueCattle.slice(0, 3).map((c) => (
                    <li key={c.id}>
                      {c.label}
                      {c.nextVaccinationDate
                        ? ` – due ${c.nextVaccinationDate}`
                        : ""}
                    </li>
                  ))}
                  {reminders.vaccinationDueCattle.length > 3 && (
                    <li>
                      + {reminders.vaccinationDueCattle.length - 3} more
                      cattle
                    </li>
                  )}
                </ul>
              )}
            </div>
          )}

          {reminders.breedingFollowUpCount > 0 && (
            <div style={{ ...alertBase, ...alertInfo }}>
              <div>
                🐄 {reminders.breedingFollowUpCount} breeding records
                need <strong>pregnancy follow-up</strong>. Please
                review the Breeding Records page.
              </div>
              {reminders.breedingFollowUps?.length > 0 && (
                <ul style={alertList}>
                  {reminders.breedingFollowUps.slice(0, 3).map((c) => (
                    <li key={c.id}>
                      {c.label}
                      {c.serviceDate ? ` – serviced on ${c.serviceDate}` : ""}
                    </li>
                  ))}
                  {reminders.breedingFollowUps.length > 3 && (
                    <li>
                      + {reminders.breedingFollowUps.length - 3} more
                      cattle
                    </li>
                  )}
                </ul>
              )}
            </div>
          )}
        </div>

        {err && <p style={errorText}>{err}</p>}

        {/* BUSINESS SUMMARY */}
        <section style={cardsGrid}>
          <div style={card}>
            <div style={cardIconCircle}>
              <GiCow style={cardIcon} />
            </div>
            <div style={cardContent}>
              <p style={cardLabel}>{tr("totalCattle", "Total cattle")}</p>
              <p style={cardValue}>{stats.totalCattle}</p>
              {/* small hint removed */}
            </div>
          </div>

          <div style={card}>
            <div style={cardIconCircleBlue}>
              <FaTint style={cardIcon} />
            </div>
            <div style={cardContent}>
              <p style={cardLabel}>{tr("milkToday", "Milk today (L)")}</p>
              <p style={cardValue}>{stats.todayMilk.toFixed(1)} L</p>
            </div>
          </div>

          <div style={card}>
            <div style={cardIconCircleProfit}>
              <FaRupeeSign style={cardIcon} />
            </div>
            <div style={cardContent}>
              <p style={cardLabel}>{tr("todayProfit", "Today’s profit")}</p>
              <p
                style={{
                  ...cardValue,
                  color: stats.todayProfit >= 0 ? "#1b5e20" : "#c62828",
                }}
              >
                ₹{stats.todayProfit.toFixed(2)}
              </p>
            </div>
          </div>
        </section>

        {/* MONTH SUMMARY */}
        <section style={monthSection}>
          <h3 style={monthTitle}>
            {tr("monthSummary", "This month summary")}
          </h3>
          <div style={monthGrid}>
            <div style={monthItem}>
              <span style={monthLabel}>{tr("totalMilk", "Milk (L)")}</span>
              <span style={monthValue}>{stats.monthMilk.toFixed(1)}</span>
            </div>
            <div style={monthItem}>
              <span style={monthLabel}>{tr("income", "Income")}</span>
              <span style={monthValue}>₹{stats.monthIncome.toFixed(0)}</span>
            </div>
            <div style={monthItem}>
              <span style={monthLabel}>{tr("costs", "Costs")}</span>
              <span style={monthValue}>₹{stats.monthCosts.toFixed(0)}</span>
            </div>
            <div style={monthItem}>
              <span style={monthLabel}>{tr("profit", "Profit")}</span>
              <span
                style={{
                  ...monthValue,
                  color: stats.monthProfit >= 0 ? "#1b5e20" : "#c62828",
                }}
              >
                ₹{stats.monthProfit.toFixed(0)}
              </span>
            </div>
          </div>
        </section>

        {/* HEALTH SNAPSHOT */}
        <section style={healthSection}>
          <div style={healthHeaderRow}>
            <div>
              <h3 style={healthTitle}>
                {tr("healthSnapshot", "Cattle health snapshot")}
              </h3>
              <p style={healthSubText}>
                {tr(
                  "healthSnapshotSub",
                  "Recent issues and treatments – open cattle details page for full history."
                )}
              </p>
            </div>
          </div>

          {healthSnapshot.length === 0 ? (
            <div style={healthPlaceholder}>
              {tr(
                "noHealthData",
                "No recent health records found. Add health checks from the health page to see them here."
              )}
            </div>
          ) : (
            <div style={healthGrid}>
              {healthSnapshot.map((h, idx) => (
                <div key={idx} style={healthCard}>
                  <div style={healthIconCircle}>
                    <FaHeartbeat style={healthIcon} />
                  </div>
                  <div style={healthContent}>
                    <p style={healthCowName}>{h.cattleLabel}</p>
                    <p style={healthProblem}>{h.problem}</p>
                    <p style={healthStatus}>
                      <span style={healthStatusLabel}>
                        {tr("status", "Status")}:
                      </span>{" "}
                      {h.status}
                    </p>
                    <p style={healthDate}>
                      {tr("lastCheck", "Last check")}: {h.lastDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

const pageWrapper = {
  padding: 16,
  minHeight: "100vh",
  background:
    "linear-gradient(180deg, #e8f5e9 0%, #f9fffb 40%, #ffffff 100%)",
};

const container = {
  maxWidth: 1100,
  margin: "0 auto",
};

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginBottom: 12,
};

// 🔔 alerts
const alertsWrapper = {
  marginBottom: 12,
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const alertBase = {
  padding: "8px 12px",
  borderRadius: 12,
  fontSize: 13,
  fontWeight: 500,
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.06)",
};

const alertWarning = {
  backgroundColor: "#fff3cd",
  color: "#856404",
  border: "1px solid #ffeeba",
};

const alertDanger = {
  backgroundColor: "#f8d7da",
  color: "#721c24",
  border: "1px solid #f5c6cb",
};

const alertInfo = {
  backgroundColor: "#d1ecf1",
  color: "#0c5460",
  border: "1px solid #bee5eb",
};

const alertList = {
  margin: "6px 0 0",
  paddingLeft: 18,
  fontSize: 12,
};

/* other existing styles */

const title = {
  margin: 0,
  color: "#1b5e20",
  fontSize: 26,
  fontWeight: 700,
  letterSpacing: 0.3,
};

const subtitle = {
  marginTop: 4,
  marginBottom: 0,
  color: "#4f5b62",
  fontSize: 14,
};

const errorText = {
  color: "#c62828",
  textAlign: "center",
  marginBottom: 12,
  fontSize: 14,
};

const cardsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 16,
};

const card = {
  backgroundColor: "#ffffff",
  borderRadius: 18,
  padding: 16,
  display: "flex",
  alignItems: "center",
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.06)",
};

const cardIconCircle = {
  width: 48,
  height: 48,
  borderRadius: "50%",
  background:
    "radial-gradient(circle at 30% 30%, #c8e6c9, #2e7d32 80%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 14,
};

const cardIconCircleBlue = {
  ...cardIconCircle,
  background:
    "radial-gradient(circle at 30% 30%, #bbdefb, #1565c0 80%)",
};

const cardIconCircleProfit = {
  ...cardIconCircle,
  background:
    "radial-gradient(circle at 30% 30%, #ffcdd2, #c62828 80%)",
};

const cardIcon = {
  fontSize: 24,
  color: "#ffffff",
};

const cardContent = {
  flex: 1,
};

const cardLabel = {
  fontSize: 13,
  color: "#607d8b",
  margin: 0,
  marginBottom: 4,
};

const cardValue = {
  fontSize: 22,
  fontWeight: 700,
  color: "#1b5e20",
  margin: 0,
};

/* month summary */

const monthSection = {
  marginTop: 24,
  backgroundColor: "#ffffff",
  borderRadius: 18,
  padding: 16,
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.04)",
};

const monthTitle = {
  margin: 0,
  marginBottom: 10,
  color: "#1b5e20",
  fontSize: 16,
  fontWeight: 600,
};

const monthGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: 12,
};

const monthItem = {
  padding: 10,
  borderRadius: 12,
  backgroundColor: "#f5f5f5",
};

const monthLabel = {
  fontSize: 12,
  color: "#607d8b",
};

const monthValue = {
  fontSize: 18,
  fontWeight: 600,
  color: "#1b5e20",
};

/* health snapshot */

const healthSection = {
  marginTop: 24,
};

const healthHeaderRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
};

const healthTitle = {
  margin: 0,
  color: "#1b5e20",
  fontSize: 18,
  fontWeight: 600,
};

const healthSubText = {
  margin: 0,
  marginTop: 4,
  color: "#607d8b",
  fontSize: 13,
};

const healthGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 16,
};

const healthCard = {
  backgroundColor: "#ffffff",
  borderRadius: 18,
  padding: 16,
  display: "flex",
  alignItems: "flex-start",
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.06)",
};

const healthIconCircle = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  background:
    "radial-gradient(circle at 30% 30%, #ffccbc, #ff5722 80%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 12,
};

const healthIcon = {
  fontSize: 22,
  color: "#ffffff",
};

const healthContent = {
  flex: 1,
};

const healthCowName = {
  margin: 0,
  fontWeight: 600,
  color: "#263238",
};

const healthProblem = {
  margin: "4px 0",
  fontSize: 13,
  color: "#37474f",
};

const healthStatus = {
  margin: 0,
  fontSize: 12,
  color: "#455a64",
};

const healthStatusLabel = {
  fontWeight: 600,
};

const healthDate = {
  margin: "4px 0 0",
  fontSize: 12,
  color: "#78909c",
};

const healthPlaceholder = {
  borderRadius: 16,
  border: "1px dashed #cfd8dc",
  padding: 16,
  textAlign: "center",
  fontSize: 14,
  color: "#78909c",
};
