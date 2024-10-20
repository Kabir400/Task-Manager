import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//routes
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Settings from "./pages/Settings.jsx";
import Analatics from "./pages/Analatics.jsx";

//toast improts
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analatics" element={<Analatics />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
