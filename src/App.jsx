import { useState } from 'react'

import './App.css'
import Loader from './components/Loader'
import AdminDashBoard from './components/AdminDashBoard'
import { supabase } from './lib/supabase';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    // 1. Login with Supabase Auth

    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password })

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }


    // 2. Get the user's profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, full_name, role, cnic, block_assign_number")
      .eq("id", data.user.id)
      .single();

    if (profileError) {
      await supabase.auth.signOut();

      setError("Profile not found.");
      setLoading(false);
      return;
    }

    // 3. Check role
    if (profile.role !== "admin") {
      await supabase.auth.signOut();

      setError("Access denied. Admin account required.");
      setLoading(false);
      return;
    }


    // 4. Admin successfully logged in
    setUser(profile);
    setLoading(false);
  }
  const handleLogout = async () => {
    await supabase.auth.signOut();

    setUser(null);
    setEmail("");
    setPassword("");
  };
  if (user) return (
    <AdminDashBoard
      user={user}
      onLogout={handleLogout}
    />
  )
  if (loading) return <Loader />

  // Admin Login
  return (
    <div onSubmit={handleLogin}>
      <h1>PSER D2D Admin</h1>

      <form >
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

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}

export default App
