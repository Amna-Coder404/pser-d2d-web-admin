import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import Loader from "./components/Loader";

import AdminDashBoard from "./components/AdminDashBoard";

import AddEmployee from "./pages/AddEmployee";
import EmployeeList from "./pages/EmployeeList";
import SurveyList from "./pages/SurveyList";

import { Button, Input } from "antd";

import { loginAdmin, logoutAdmin, getCurrentAdmin } from "./services/auth";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const [error, setError] = useState("");

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { profile, error: loginError } = await loginAdmin(email, password);

    if (loginError) {
      setError(loginError);
      setLoading(false);
      return;
    }

    setUser(profile);
    setLoading(false);
  };

  // LOGOUT
  const handleLogout = async () => {
    const { success } = await logoutAdmin();

    if (!success) return;

    setUser(null);
    setEmail("");
    setPassword("");
    setError("");
  };

  // CHECK EXISTING SESSION
  useEffect(() => {
    const checkSession = async () => {
      const { profile } = await getCurrentAdmin();

      if (profile) {
        setUser(profile);
      }

      setAuthLoading(false);
    };

    checkSession();
  }, []);

  // LOADING SCREEN
  if (loading || authLoading) {
    return <Loader />;
  }

  // ADMIN PAGES (ROUTER)
  if (user) {
    return (
      <Routes>
        <Route >
          <Route path="/" element={<AdminDashBoard user={user} />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/surveys" element={<SurveyList />} />
          <Route path="/add-employee" element={<AddEmployee />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // LOGIN
  return (
    <div className="login-page">
      <div className="login-card">
        {/* HEADER */}
        <div className="login-header">
          <div className="login-logo">P</div>
          <h1>PSER D2D</h1>
          <p>Admin Dashboard</p>
        </div>

        {/* LOGIN FORM */}
        <form className="login-form" onSubmit={handleLogin}>
          {/* EMAIL */}
          <div className="form-group">
            <label htmlFor="admin-email">Email</label>
            <Input
              id="admin-email"
              type="email"
              size="large"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <Input.Password
              id="admin-password"
              size="large"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              styles={{
                root: {
                  background: "#1f1f1f",
                  borderColor: "#333333",
                },
                input: {
                  background: "#1f1f1f",
                  color: "#ffffff",
                },
                suffix: {
                  color: "#777777",
                },
              }}
            />
          </div>

          {/* ERROR */}
          {error && <p className="login-error">{error}</p>}

          {/* LOGIN BUTTON */}
          <Button
            className="login-button"
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default App;