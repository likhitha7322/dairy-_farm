// src/components/recordmenu.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../lang/LanguageContext";

// Icons
import { FaTint, FaHeartbeat, FaVenusMars, FaLightbulb } from "react-icons/fa";
import { GiCow } from "react-icons/gi";

export default function RecordMenu() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const items = [
    {
      key: "cattle",
      label: t("navCattleList") || "Cattle",
      icon: <GiCow />, // 🐄
      bg: "#24a04d",
      path: "/cattle",
    },
    {
      key: "milk",
      label: t("navMilkFeed") || "Milk & Feed",
      icon: <FaTint />, // 🥛
      bg: "#1e88e5",
      path: "/milkFeedpage",
    },
    {
      key: "health",
      label: t("navHealth") || "Health",
      icon: <FaHeartbeat />, // ❤️‍🩹
      bg: "#ff9800",
      path: "/health",
    },
    {
      key: "breeding",
      label: t("navBreeding") || "Breeding",
      icon: <FaVenusMars />, // ♂♀
      bg: "#d81b60",
      path: "/breeding",
    },
    {
      key: "tips",
      label: t("navFarmingTips") || "Farming Tips",
      icon: <FaLightbulb />, // 💡
      bg: "#8e24aa",
      path: "/tips",
    },
  ];

  return (
    <div style={{ width: "100%", textAlign: "center", paddingTop: 20 }}>
      {/* Title */}
      <h2
        style={{
          fontSize: "1.8rem",
          fontWeight: 700,
          color: "#1b5e20",
          marginBottom: 20,
        }}
      >
        {t("recordMenuTitle") || "Farm Records"}
      </h2>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 30,
          flexWrap: "wrap",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {items.map((item) => (
          <div
            key={item.key}
            onClick={() => navigate(item.path)}
            style={{
              width: 180,
              height: 200,
              background: "#ffffff",
              borderRadius: 24,
              boxShadow: "0 8px 18px rgba(0,0,0,0.12)",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 12px 24px rgba(0,0,0,0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 18px rgba(0,0,0,0.12)";
            }}
          >
            {/* Circle Icon */}
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                background: item.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
              }}
            >
              <span style={{ fontSize: 38, color: "#ffffff" }}>
                {item.icon}
              </span>
            </div>

            {/* Label */}
            <span
              style={{
                color: "#1b5e20",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
