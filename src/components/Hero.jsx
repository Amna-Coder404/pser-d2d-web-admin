import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    Users,
    UserPlus,
    ClipboardList,
    UserCheck,
    UserX,
    ArrowUpRight,
    ArrowDown,
} from "lucide-react";
import { getAllEmployees } from "../services/survey";
import "../styles/Hero.css";

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
}

function CountUp({ value }) {
    const [n, setN] = useState(0);

    useEffect(() => {
        let frame;
        const start = performance.now();
        const duration = 900;

        const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
            if (p < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [value]);

    return <>{n}</>;
}

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function Hero({ user }) {
    const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });

    const name = user?.full_name || user?.name || "Admin";
    const today = new Date().toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    useEffect(() => {
        const loadStats = async () => {
            try {
                const employees = await getAllEmployees();
                const active = employees.filter((e) => e.is_active).length;
                setStats({
                    total: employees.length,
                    active,
                    inactive: employees.length - active,
                });
            } catch (error) {
                console.log("HERO STATS ERROR:", error);
            }
        };
        loadStats();
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const statCards = [
        { label: "Total Employees", value: stats.total, icon: Users, tone: "" },
        { label: "Active", value: stats.active, icon: UserCheck, tone: "green" },
        { label: "Inactive", value: stats.inactive, icon: UserX, tone: "red" },
    ];

    const actions = [
        {
            id: "employees",
            title: "Employees",
            text: "View, edit and manage accounts",
            icon: Users,
        },
        {
            id: "add-employee",
            title: "Add Employee",
            text: "Create a new employee account",
            icon: UserPlus,
        },
        {
            id: "surveys",
            title: "Surveys",
            text: "Review submitted surveys",
            icon: ClipboardList,
        },
    ];

    return (
        <section className="hero">
            <div className="hero-glow hero-glow-top" />
            <div className="hero-glow hero-glow-side" />

            <motion.div
                className="hero-content"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {/* Date badge */}
                <motion.span className="hero-badge" variants={item}>
                    <span className="hero-live-dot" />
                    {today}
                </motion.span>

                {/* Title */}
                <motion.h1 className="hero-title" variants={item}>
                    {getGreeting()},
                    <br />
                    <span>{name}</span>
                </motion.h1>

                <motion.p className="hero-text" variants={item}>
                    Manage your field employees, add new accounts and review
                    submitted surveys, all from one place.
                </motion.p>

                {/* Stats */}
                <motion.div className="hero-stats" variants={item}>
                    {statCards.map(({ label, value, icon: Icon, tone }) => (
                        <div className="hero-stat" key={label}>
                            <div className={`hero-stat-icon ${tone}`}>
                                <Icon size={18} />
                            </div>
                            <div className="hero-stat-text">
                                <strong>
                                    <CountUp value={value} />
                                </strong>
                                <span>{label}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Action cards */}
                <motion.div className="hero-actions" variants={item}>
                    {actions.map(({ id, title, text, icon: Icon }) => (
                        <button
                            key={id}
                            className="hero-action"
                            onClick={() => scrollTo(id)}
                        >
                            <div className="hero-action-icon">
                                <Icon size={20} />
                            </div>
                            <div className="hero-action-text">
                                <strong>{title}</strong>
                                <span>{text}</span>
                            </div>
                            <ArrowUpRight size={18} className="hero-action-arrow" />
                        </button>
                    ))}
                </motion.div>
            </motion.div>

            <button
                className="hero-scroll"
                onClick={() => scrollTo("employees")}
                aria-label="Scroll down"
            >
                <ArrowDown size={18} />
            </button>
        </section>
    );
}

export default Hero;