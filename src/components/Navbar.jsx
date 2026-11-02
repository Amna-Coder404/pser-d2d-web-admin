import { LogOut } from "lucide-react";
import "../styles/Navbar.css";

function Navbar({ user, onLogout }) {
    const displayName = user?.full_name || user?.name || user?.email || "Admin";
    const role = user?.role || "Admin";

    return (
        <header className="navbar">
            <div className="navbar-inner">
                {/* Brand */}
                <div className="navbar-brand">
                    <div className="navbar-logo">P</div>
                    <div className="navbar-brand-text">
                        <span className="navbar-title">PSER D2D</span>
                        <span className="navbar-subtitle">Admin Dashboard</span>
                    </div>
                </div>

                {/* Right side */}
                <div className="navbar-right">
                    <div className="navbar-user">
                        <div className="navbar-avatar">
                            {displayName.charAt(0).toUpperCase()}
                        </div>
                        <div className="navbar-user-text">
                            <span className="navbar-user-name">{displayName}</span>
                            <span className="navbar-user-role">{role}</span>
                        </div>
                    </div>

                    <button
                        className="navbar-logout"
                        onClick={onLogout}
                        aria-label="Logout"
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;