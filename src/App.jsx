import { useEffect, useState } from "react";

import "./App.css";

import Loader from "./components/Loader";
import AdminDashBoard from "./components/AdminDashBoard";

import {
  loginAdmin,
  logoutAdmin,
  getCurrentAdmin,
} from "./services/auth";

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

    const {
      profile,
      error: loginError,
    } = await loginAdmin(email, password);

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

    if (!success) {
      return;
    }

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

  // ADMIN DASHBOARD
  if (user) {
    return (
      <AdminDashBoard
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  // LOGIN
  return (
    <div>
      <h1>PSER D2D Admin</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            required
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button
          type="submit"
          disabled={loading}  >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default App;