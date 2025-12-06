// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");

    if (!form.identifier.trim() || !form.password.trim()) {
      setErr("Please enter phone/email & password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // single field the backend reads as identifier
          identifier: form.identifier,
          password: form.password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setErr(data.message || "Invalid login");
        return;
      }

      // success → store auth and go dashboard
      localStorage.setItem("diary_token", data.token);
      localStorage.setItem("diary_user", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");

      navigate("/");
    } catch (error) {
      setLoading(false);
      setErr("Server error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>🐄 Dairy Farm Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email or Phone"
            value={form.identifier}
            onChange={(e) =>
              setForm({ ...form, identifier: e.target.value })
            }
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <span
              className="toggle-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {err && <p className="auth-error">{err}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        <p
          className="small-link"
          onClick={() => navigate("/forgot-password")}
          style={{ marginTop: 8 }}
        >
          Forgot password?
        </p>

        <p className="small-link" onClick={() => navigate("/signup")}>
          Don’t have an account? Sign Up
        </p>
      </div>
    </div>
  );
}
