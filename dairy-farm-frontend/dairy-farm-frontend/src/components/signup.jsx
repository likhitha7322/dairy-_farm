// src/components/signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErr("");

    if (!form.name.trim() || !form.phone.trim() || !form.password.trim()) {
      setErr("Name, phone and password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setErr(data.message || "Signup failed");
        return;
      }

      // auto-login after signup
      localStorage.setItem("diary_token", data.token);
      localStorage.setItem("diary_user", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");

      navigate("/"); // go to dashboard
    } catch (error) {
      setLoading(false);
      setErr("Server error, please try again");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>🐄 Dairy Farm Sign Up</h1>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          {err && <p className="auth-error">{err}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating account…" : "Sign Up"}
          </button>
        </form>

        <p
          className="small-link"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}
