// src/App.jsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LanguageProvider } from "./lang/LanguageContext";

import Layout from "./components/layout";

import Dashboard from "./components/dashboard";
import RecordMenu from "./components/recordmenu";

import CattleList from "./components/cattlelist";
import CattleDetails from "./components/cattledetails";
import CattleRegistration from "./components/cattleRegistration";

import MilkFeedpage from "./components/milkFeedpage";
import HealthRecord from "./components/healthrecord";
import BreedRecord from "./components/breedrecord";
import FarmingTips from "./components/FarmingTips";
import Profile from "./components/Profile";
import ChatAssistant from "./components/ChatAssitant";

import Login from "./components/Login";
import Signup from "./components/signup";

import "./App.css";

/* ---------------- SIMPLE 404 ---------------- */
function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, system-ui, sans-serif",
        background: "#e3f2fd",
      }}
    >
      <h2>404 Not Found</h2>
    </div>
  );
}

/* ---------------- AUTH HELPERS ---------------- */
function useIsLoggedIn() {
  const token = localStorage.getItem("diary_token");
  return !!token; // token exists -> logged in
}

// Protect internal pages (requires login)
function RequireAuth({ children }) {
  const location = useLocation();
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/signup" replace state={{ from: location }} />;
  }

  return children;
}

// Prevent logged users from accessing login/signup again
function GuestOnly({ children }) {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

/* ---------------- ROUTES ---------------- */
function AppRoutes() {
  return (
    <Routes>
      {/* Guest-only pages */}
      <Route
        path="/login"
        element={
          <GuestOnly>
            <Login />
          </GuestOnly>
        }
      />
      <Route
        path="/signup"
        element={
          <GuestOnly>
            <Signup />
          </GuestOnly>
        }
      />

      {/* Protected pages */}
      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Dashboard />} />

        <Route path="/recordmenu" element={<RecordMenu />} />

        <Route path="/cattle" element={<CattleList />} />
        <Route path="/cattle/register" element={<CattleRegistration />} />
        <Route path="/cattle/:id" element={<CattleDetails />} />

        <Route path="/milkFeedpage" element={<MilkFeedpage />} />
        <Route path="/health" element={<HealthRecord />} />
        <Route path="/breeding" element={<BreedRecord />} />
        <Route path="/tips" element={<FarmingTips />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<ChatAssistant />} />

        {/* 404 inside Layout */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  );
}

export default App;
