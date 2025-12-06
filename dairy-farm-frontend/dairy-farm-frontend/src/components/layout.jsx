// src/components/layout.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  FaHome,
  FaLanguage,
  FaSignOutAlt,
  FaBars,
  FaUserCircle,
  FaLeaf,
  FaChartLine,
  FaMicrophone,
  FaComments,
} from "react-icons/fa";
import { useLanguage } from "../lang/LanguageContext";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const { language, setLanguage, t } = useLanguage();

  // Load user from localStorage
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) setUser(userData);
    } catch {
      setUser(null);
    }
  }, []);

  // Initialize Voice Recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        console.log("🎤 You said:", text);
        handleVoiceCommand(text);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("Voice recognition not supported in this browser.");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onstart = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) {
      alert(
        t("voiceNotSupported") ||
          "Voice recognition is not supported in this browser."
      );
      return;
    }

    try {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    } catch (err) {
      console.error("Error starting/stopping recognition:", err);
    }
  };

  const handleVoiceCommand = (rawText) => {
    const text = rawText.toLowerCase().trim();
    console.log("🧠 Command parsed:", text);

    // ---- Language change by voice ----
    if (text.includes("english")) {
      setLanguage("en");
      alert("✅ Language set to English");
      return;
    }
    if (text.includes("kannada") || text.includes("kanada")) {
      setLanguage("kn");
      alert("✅ Language set to Kannada");
      return;
    }
    if (text.includes("hindi")) {
      setLanguage("hi");
      alert("✅ Language set to Hindi");
      return;
    }
    if (text.includes("tamil")) {
      setLanguage("ta");
      alert("✅ Language set to Tamil");
      return;
    }
    if (text.includes("telugu")) {
      setLanguage("te");
      alert("✅ Language set to Telugu");
      return;
    }
    if (text.includes("marathi")) {
      setLanguage("mr");
      alert("✅ Language set to Marathi");
      return;
    }

    // helper for navigation
    const go = (path, label) => {
      navigate(path);
      alert(
        `🚀 ${t("navigatingTo") || "Navigating to"} ${
          label || path
        }`
      );
    };

    // ---- Navigation commands (main pages) ----

    // Home / Dashboard
    if (
      text.includes("home") ||
      text.includes("dashboard") ||
      text.includes("main page")
    ) {
      go("/", "Home");
      return;
    }

    // Record menu (all records menu)
    if (
      text.includes("record menu") ||
      (text.includes("records") && text.includes("all")) ||
      text.includes("all records") ||
      text.includes("data entry")
    ) {
      go("/recordmenu", "Record Menu");
      return;
    }

    // Cattle records
    if (
      text.includes("cattle list") ||
      text.includes("cattle record") ||
      text.includes("cattle records") ||
      text.includes("cow list") ||
      text.includes("animal list") ||
      text === "cattle"
    ) {
      go("/cattle", "Cattle Records");
      return;
    }

    // Health records
    if (
      text.includes("health record") ||
      text.includes("health records") ||
      text.includes("animal health") ||
      text.includes("health list")
    ) {
      go("/health", "Health Records");
      return;
    }

    // Breeding records
    if (
      text.includes("breeding record") ||
      text.includes("breeding records") ||
      text.includes("breeding list") ||
      text === "breeding"
    ) {
      go("/breeding", "Breeding Records");
      return;
    }

    // Milk / Feed records
    if (
      text.includes("milk feed") ||
      text.includes("milk and feed") ||
      text.includes("feed record") ||
      text.includes("feed records") ||
      text.includes("milk record") ||
      text.includes("milk records") ||
      text === "milk" ||
      text === "feed"
    ) {
      go("/milkfeed", "Milk & Feed Records");
      return;
    }

    // Chat / Assistant
    if (
      text.includes("chat") ||
      text.includes("assistant") ||
      text.includes("ask") ||
      text.includes("help me")
    ) {
      go("/chat", "Chat");
      return;
    }

    // Tips
    if (
      text.includes("tips") ||
      text.includes("advice") ||
      text.includes("farming tips")
    ) {
      go("/tips", "Tips");
      return;
    }

    // Profile
    if (
      text.includes("profile") ||
      text.includes("account") ||
      text.includes("my details")
    ) {
      go("/profile", "Profile");
      return;
    }

    // Logout / Sign out
    if (
      text.includes("logout") ||
      text.includes("log out") ||
      text.includes("sign out") ||
      text.includes("exit app")
    ) {
      handleLogout();
      return;
    }

    // Fallback – just show what user said
    alert(`🎙️ ${t("youSaid") || "You said"}: "${rawText}"`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const languageOptions = [
    { code: "en", label: "English" },
    { code: "kn", label: "Kannada" },
    { code: "hi", label: "Hindi" },
    { code: "ta", label: "Tamil" },
    { code: "te", label: "Telugu" },
    { code: "mr", label: "Marathi" },
  ];

  const onLanguageChange = (e) => setLanguage(e.target.value);

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <header style={styles.header}>
        <FaBars
          onClick={() => setSidebarOpen((prev) => !prev)}
          style={styles.hamburger}
        />
        <h1 style={styles.title}>
          🐄 {t("dairyFarmManagement") || "Dairy Farm Management"}
        </h1>
      </header>

      {/* DARK OVERLAY */}
      {sidebarOpen && (
        <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside
        style={{
          ...styles.sidebar,
          left: sidebarOpen ? "0" : "-270px",
        }}
      >
        <div style={styles.sidebarHeader}>
          <h3 style={styles.sidebarTitle}>{t("menu") || "Menu"}</h3>
          <button
            onClick={() => setSidebarOpen(false)}
            style={styles.closeBtn}
            aria-label={t("close") || "Close menu"}
          >
            ✕
          </button>
        </div>

        {user && (
          <div style={styles.userChip}>
            <FaUserCircle style={{ marginRight: 6 }} />
            <span style={{ fontSize: 12 }}>
              {user.name || t("farmer") || "Farmer"}
            </span>
          </div>
        )}

        <div
          style={styles.sidebarItem}
          onClick={() => {
            navigate("/");
            setSidebarOpen(false);
          }}
        >
          <FaHome style={styles.icon} />
          <span>{t("dashboard") || "Dashboard"}</span>
        </div>

        {/* Language selector */}
        <div style={{ marginTop: 10, marginBottom: 4 }}>
          <div style={styles.sidebarItemStatic}>
            <FaLanguage style={styles.icon} />
            <span>{t("selectLanguage") || "Select Language"}</span>
          </div>
          <select
            value={language}
            onChange={onLanguageChange}
            style={styles.languageSelect}
          >
            {languageOptions.map((opt) => (
              <option key={opt.code} value={opt.code}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div
          style={styles.sidebarItem}
          onClick={() => {
            navigate("/profile");
            setSidebarOpen(false);
          }}
        >
          <FaUserCircle style={styles.icon} />
          <span>{t("profile") || "Profile"}</span>
        </div>

        <div
          style={styles.sidebarItem}
          onClick={() => {
            navigate("/tips");
            setSidebarOpen(false);
          }}
        >
          <FaLeaf style={styles.icon} />
          <span>{t("tips") || "Tips"}</span>
        </div>

        <div
          style={{ ...styles.sidebarItem, marginTop: "auto" }}
          onClick={handleLogout}
        >
          <FaSignOutAlt style={{ ...styles.icon, color: "#c62828" }} />
          <span style={{ color: "#c62828", fontWeight: 600 }}>
            {t("logout") || "Logout"}
          </span>
        </div>
      </aside>

      {/* MAIN CONTENT  – uses children if given, otherwise <Outlet /> */}
      <main style={styles.pageContent}>{children || <Outlet />}</main>

      {/* VOICE LISTENING INDICATOR */}
      {isListening && (
        <div style={styles.listeningIndicator}>
          🎧 {t("listening") || "Listening..."}
        </div>
      )}

      {/* BOTTOM NAV */}
      <footer style={styles.bottomNav}>
        <button style={styles.navButton} onClick={() => navigate("/")}>
          <FaHome /> <span>{t("home") || "Home"}</span>
        </button>
        <button
          style={styles.navButton}
          onClick={() => navigate("/recordmenu")}
        >
          <FaChartLine /> <span>{t("record") || "Record"}</span>
        </button>
        <button
          style={{
            ...styles.navButton,
            transform: isListening ? "scale(1.15)" : "scale(1)",
            opacity: isListening ? 1 : 0.9,
          }}
          onClick={startListening}
        >
          <FaMicrophone
            style={{ color: isListening ? "#ff5252" : "white" }}
          />
          <span>{t("voice") || "Voice"}</span>
        </button>
        <button style={styles.navButton} onClick={() => navigate("/chat")}>
          <FaComments /> <span>{t("chat") || "Chat"}</span>
        </button>
      </footer>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f0fdf4, #ffffff)",
    position: "relative",
    overflowX: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(90deg, #1b5e20, #43a047)",
    color: "white",
    padding: "12px 20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    position: "sticky",
    top: 0,
    zIndex: 1100,
  },
  hamburger: {
    fontSize: "26px",
    cursor: "pointer",
    marginRight: "15px",
  },
  title: {
    fontSize: "1.3rem",
    fontWeight: "600",
    margin: 0,
    color: "#ffffff",
    textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.25)",
    zIndex: 1000,
  },

  sidebar: {
    position: "fixed",
    top: 0,
    left: "-270px",
    width: "250px",
    height: "100%",
    background: "#ffffff",
    boxShadow: "3px 0 15px rgba(0,0,0,0.15)",
    padding: "20px",
    transition: "left 0.3s ease-in-out",
    zIndex: 1050,
    display: "flex",
    flexDirection: "column",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "6px",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "18px",
    cursor: "pointer",
    lineHeight: 1,
  },
  userChip: {
    display: "flex",
    alignItems: "center",
    background: "#e8f5e9",
    borderRadius: "999px",
    padding: "4px 10px",
    color: "#1b5e20",
    fontSize: "12px",
    marginBottom: "8px",
  },
  sidebarTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#1b5e20",
  },
  sidebarItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "10px",
    transition: "background 0.15s, transform 0.1s",
    marginTop: "4px",
  },
  sidebarItemStatic: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "4px 2px",
    color: "#1b5e20",
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  languageSelect: {
    width: "100%",
    padding: "8px",
    borderRadius: "10px",
    border: "1px solid #a5d6a7",
    outline: "none",
    fontSize: "0.85rem",
    boxSizing: "border-box",
    background: "#f9fff8",
  },
  icon: {
    color: "#1b5e20",
    fontSize: "18px",
  },
  pageContent: {
    padding: "20px",
    paddingBottom: "90px",
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "64px",
    background: "linear-gradient(90deg, #1b5e20, #2e7d32)",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    boxShadow: "0 -4px 12px rgba(0,0,0,0.15)",
    zIndex: 900,
  },
  navButton: {
    background: "none",
    border: "none",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "13px",
    cursor: "pointer",
    gap: "4px",
    transition: "transform 0.2s, opacity 0.2s",
  },
  listeningIndicator: {
    position: "fixed",
    bottom: "80px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#1b5e20",
    color: "white",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    zIndex: 1200,
  },
};
