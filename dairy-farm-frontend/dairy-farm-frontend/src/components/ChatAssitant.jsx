// src/components/ChatAssistant.jsx
import React, { useState } from "react";
import { useLanguage } from "../lang/LanguageContext";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000/api";

export default function ChatAssistant() {
  // ✅ only t, like your other components
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState("chat");

  // ---- Chat state ----
  const [chatMessages, setChatMessages] = useState([
    {
      from: "bot",
      text: "👋 Hello! I am your Dairy Farm Assistant. Ask about feed, milk, health, hygiene or breeding!",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const [listening, setListening] = useState(false);

  // ---- Disease state ----
  const [symptoms, setSymptoms] = useState("");
  const [diseaseResult, setDiseaseResult] = useState(null);
  const [loadingDisease, setLoadingDisease] = useState(false);

  // ---- Feed state ----
  const [feedForm, setFeedForm] = useState({
    milkYield: "",
    stage: "mid",
    bodyScore: "normal",
  });
  const [feedResult, setFeedResult] = useState(null);
  const [loadingFeed, setLoadingFeed] = useState(false);

  // ---------- helpers for styles ----------
  const tabButtonStyle = (color, active) => ({
    backgroundColor: active ? color : "#ffffff",
    color: active ? "#ffffff" : color,
    border: `2px solid ${color}`,
    borderRadius: "9999px",
    padding: "6px 18px",
    fontWeight: 600,
    fontSize: "0.9rem",
    cursor: "pointer",
  });

  const mainButtonStyle = (bg) => ({
    backgroundColor: bg,
    color: "#ffffff",
    border: "none",
    borderRadius: "9999px",
    padding: "8px 18px",
    fontWeight: 600,
    fontSize: "0.9rem",
    cursor: "pointer",
  });

  // ---------- handlers ----------
  const sendChat = async (e) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text || loadingChat) return;

    const newMessages = [...chatMessages, { from: "user", text }];
    setChatMessages(newMessages);
    setChatInput("");
    setLoadingChat(true);

    try {
      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 🔹 keep same shape as your original backend
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const reply =
        data && data.success && data.reply
          ? data.reply
          : "Server error. Please try again later.";
      setChatMessages([...newMessages, { from: "bot", text: reply }]);
    } catch (err) {
      console.error(err);
      setChatMessages([
        ...newMessages,
        { from: "bot", text: "Error contacting server." },
      ]);
    } finally {
      setLoadingChat(false);
    }
  };

  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // 🔹 translated voice-not-supported message
      alert(
        t("voiceNotSupported") ||
          "Voice input is not supported in this browser."
      );
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setChatInput((prev) => (prev ? prev + " " + transcript : transcript));
    };
    recognition.start();
  };

  const handleDiseaseSubmit = async (e) => {
    e.preventDefault();
    const text = symptoms.trim();
    if (!text || loadingDisease) return;

    setLoadingDisease(true);
    setDiseaseResult(null);

    try {
      const res = await fetch(`${API_BASE}/ai/disease`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: text }),
      });
      const data = await res.json();
      if (data && data.success) {
        setDiseaseResult(data);
      } else {
        setDiseaseResult({
          success: false,
          disease: "Error",
          confidence: 0,
          advice: data?.error || "Server error.",
        });
      }
    } catch (err) {
      console.error(err);
      setDiseaseResult({
        success: false,
        disease: "Error",
        confidence: 0,
        advice: "Error contacting server.",
      });
    } finally {
      setLoadingDisease(false);
    }
  };

  const handleFeedChange = (e) => {
    const { name, value } = e.target;
    setFeedForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeedSubmit = async (e) => {
    e.preventDefault();
    if (loadingFeed) return;

    setLoadingFeed(true);
    setFeedResult(null);

    try {
      const res = await fetch(`${API_BASE}/ai/feed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedForm),
      });
      const data = await res.json();
      if (data && data.success) {
        setFeedResult(data);
      } else {
        setFeedResult({
          success: false,
          green: "",
          dry: "",
          conc: "",
          notes: data?.error || "Server error.",
        });
      }
    } catch (err) {
      console.error(err);
      setFeedResult({
        success: false,
        green: "",
        dry: "",
        conc: "",
        notes: "Error contacting server.",
      });
    } finally {
      setLoadingFeed(false);
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-green-100 p-6 md:p-8">
        {/* Heading WITHOUT "AI" */}
        <h1 className="text-3xl font-bold text-green-800 mb-1">
          🐄 Dairy Farm Assistant
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          Helper for small dairy farmers – feed, milk, health, breeding & hygiene.
        </p>

        {/* Tabs */}
        <div
          className="flex flex-wrap gap-3 mb-6 pb-2 px-2 py-1"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "9999px",
            border: "1px solid #a5d6a7",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          <button
            onClick={() => setActiveTab("chat")}
            style={tabButtonStyle("#1b5e20", activeTab === "chat")}
          >
            {/* 🔹 use translation key for chat tab */}
            🗨 {t("chat")}
          </button>
          <button
            onClick={() => setActiveTab("disease")}
            style={tabButtonStyle("#1565c0", activeTab === "disease")}
          >
            🧬 Disease Helper
          </button>
          <button
            onClick={() => setActiveTab("feed")}
            style={tabButtonStyle("#ef6c00", activeTab === "feed")}
          >
            🐄 Feed Advisor
          </button>
        </div>

        {/* CHAT TAB */}
        {activeTab === "chat" && (
          <div className="grid md:grid-cols-[2fr_1fr] gap-4">
            <div className="h-[60vh] flex flex-col border border-gray-200 rounded-2xl bg-gray-50 shadow-sm">
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.from === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 rounded-2xl max-w-[80%] text-sm whitespace-pre-line ${
                        msg.from === "user"
                          ? "bg-green-600 text-white"
                          : "bg-white text-gray-900 border border-gray-200"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={sendChat}
                className="flex items-center gap-2 p-3 border-t border-gray-200 bg-white rounded-b-2xl"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="w-full border rounded-full px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                    placeholder="Ask something..."
                  />
                  <button
                    type="button"
                    onClick={startVoiceInput}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 text-lg ${
                      listening
                        ? "text-red-500"
                        : "text-gray-500 hover:text-green-600"
                    }`}
                    title="Voice input"
                  >
                    🎤
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loadingChat}
                  style={mainButtonStyle("#1b5e20")}
                >
                  Send
                </button>
              </form>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm text-sm">
              <h2 className="font-semibold mb-2 text-gray-800">
                Example questions
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>How to increase milk production?</li>
                <li>Feed ratio for 8 L/day cow?</li>
                <li>Heat signs and AI timing?</li>
                <li>How to prevent mastitis?</li>
                <li>Best way to keep shed clean?</li>
              </ul>
            </div>
          </div>
        )}

        {/* DISEASE TAB */}
        {activeTab === "disease" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50 shadow-sm">
              <h2 className="font-semibold mb-2 text-gray-800">
                Describe the symptoms
              </h2>
              <form onSubmit={handleDiseaseSubmit} className="space-y-3">
                <textarea
                  rows="6"
                  className="w-full border rounded-xl p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                  placeholder="Example: fever, not eating, swollen udder…"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loadingDisease}
                  style={mainButtonStyle("#1565c0")}
                >
                  {loadingDisease ? "Analyzing..." : "Get Advice"}
                </button>
              </form>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
              <h2 className="font-semibold mb-2 text-gray-800">
                Possible disease & management
              </h2>
              {diseaseResult ? (
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Disease:</strong> {diseaseResult.disease}
                  </p>
                  <p>
                    <strong>Confidence:</strong>{" "}
                    {Math.round((diseaseResult.confidence || 0) * 100)}%
                  </p>
                  <p className="whitespace-pre-line">
                    <strong>Advice:</strong> {diseaseResult.advice}
                  </p>
                  <p className="text-xs text-red-500 mt-2">
                    Always consult a veterinarian for final diagnosis.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Enter symptoms on the left and click <b>Get Advice</b>.
                </p>
              )}
            </div>
          </div>
        )}

        {/* FEED TAB */}
        {activeTab === "feed" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50 shadow-sm">
              <h2 className="font-semibold mb-2 text-gray-800">
                Animal details
              </h2>
              <form onSubmit={handleFeedSubmit} className="space-y-3">
                <div>
                  <label className="block text-sm mb-1">
                    Milk yield (L/day)
                  </label>
                  <input
                    type="number"
                    name="milkYield"
                    className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                    value={feedForm.milkYield}
                    onChange={handleFeedChange}
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Stage of lactation
                  </label>
                  <select
                    name="stage"
                    className="w-full border rounded-xl px-3 py-2 text-sm"
                    value={feedForm.stage}
                    onChange={handleFeedChange}
                  >
                    <option value="early">Early lactation</option>
                    <option value="mid">Mid lactation</option>
                    <option value="late">Late lactation</option>
                    <option value="dry">Dry</option>
                    <option value="pregnant">
                      Pregnant (last 2 months)
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Body condition
                  </label>
                  <select
                    name="bodyScore"
                    className="w-full border rounded-xl px-3 py-2 text-sm"
                    value={feedForm.bodyScore}
                    onChange={handleFeedChange}
                  >
                    <option value="thin">Thin</option>
                    <option value="normal">Normal</option>
                    <option value="fat">Fat</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loadingFeed}
                  style={mainButtonStyle("#ef6c00")}
                >
                  {loadingFeed ? "Calculating..." : "Get Feed Plan"}
                </button>
              </form>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
              <h2 className="font-semibold mb-2 text-gray-800">
                Recommended ration
              </h2>
              {feedResult ? (
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Green fodder:</strong> {feedResult.green}
                  </p>
                  <p>
                    <strong>Dry fodder:</strong> {feedResult.dry}
                  </p>
                  <p>
                    <strong>Concentrates:</strong> {feedResult.conc}
                  </p>
                  <p className="whitespace-pre-line">
                    <strong>Notes:</strong> {feedResult.notes}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Fill the details and click <b>Get Feed Plan</b> to see
                  suggestions.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
