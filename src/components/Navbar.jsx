import { useEffect, useState } from "react";
import { LogOut, Users, UserPlus, ClipboardList } from "lucide-react";
import "../styles/Navbar.css";

const NAV_LINKS = [
    { label: "Employees", id: "employees", icon: Users },
    { label: "Add Employee", id: "add-employee", icon: UserPlus },
    { label: "Surveys", id: "surveys", icon: ClipboardList },
];

function Navbar({ user, onLogout }) {
    const [active, setActive] = useState(NAV_LINKS[0].id);

    const displayName = user?.full_name || user?.name || user?.email || "Admin";
    const role = user?.role || "Admin";

    // Highlight the link of the section currently on screen
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );

        NAV_LINKS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollTo = (id) => {
        document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <header className="navbar">
            <div className="navbar-inner">
                <div className="navbar-brand">


                    <div className="navbar-user-text">
                        <span className="navbar-user-name">PSER D2D</span>
                        <span className="navbar-user-role">{role} dashboard</span>
                    </div>
                </div>



                <div className="navbar-right">
                    <nav className="navbar-links" aria-label="Sections">
                        {NAV_LINKS.map(({ label, id, icon: Icon }) => (
                            <button
                                key={id}
                                type="button"
                                title={label}
                                aria-label={label}
                                className={`navbar-link ${active === id ? "active" : ""}`}
                                onClick={() => scrollTo(id)}
                            >
                                <Icon size={17} />
                                <span>{label}</span>
                            </button>
                        ))}
                    </nav>
                    <button
                        type="button"
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