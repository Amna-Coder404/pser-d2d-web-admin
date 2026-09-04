import { useEffect, useState } from "react";

import "./App.css";
import Loader from "./components/Loader";
import AdminDashBoard from "./components/AdminDashBoard";
import { supabase } from "./lib/supabase";

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

    const { data, error: loginError, } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    // Get logged-in user's profile
    const { data: profile, error: profileError,
    } = await supabase
      .from("profiles")
      .select(
        "id, full_name, role, cnic, block_assign_number"
      )
      .eq("id", data.user.id)
      .single();

    if (profileError || !profile) {
      await supabase.auth.signOut();

      setError("Profile not found.");
      setLoading(false);
      return;
    }

    // Only admin can access web admin panel
    if (profile.role !== "admin") {
      await supabase.auth.signOut();

      setError("Access denied. Admin account required.");
      setLoading(false);
      return;
    }

    setUser(profile);
    setLoading(false);
  };

  // LOGOUT
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("LOGOUT ERROR:", error);
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
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // No logged-in user
      if (!session) {
        setAuthLoading(false);
        return;
      }

      // Get user's profile
      const { data: profile, error: profileError, } = await supabase
        .from("profiles")
        .select(
          "id, full_name, role, cnic, block_assign_number"
        )
        .eq("id", session.user.id)
        .single();

      // Invalid profile/session
      if (
        profileError ||
        !profile ||
        profile.role !== "admin"
      ) {
        await supabase.auth.signOut();

        setAuthLoading(false);
        return;
      }

      // Restore logged-in admin
      setUser(profile);
      setAuthLoading(false);
    };

    checkSession();
  }, []);

  // Loading Screen
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


  return (
    <div>
      <h1>PSER D2D Admin</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Admin email"
            required
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Admin password"
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default App;