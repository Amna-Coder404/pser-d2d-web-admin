
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Users, UserCheck, UserX } from "lucide-react";
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
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut" },
    },
};

function Hero({ user }) {
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        inactive: 0,
    });

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

    const statCards = [
        {
            label: "Total Employees",
            value: stats.total,
            icon: Users,
            tone: "",
        },
        {
            label: "Active",
            value: stats.active,
            icon: UserCheck,
            tone: "green",
        },
        {
            label: "Inactive",
            value: stats.inactive,
            icon: UserX,
            tone: "red",
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
                <motion.span className="hero-badge" variants={item}>
                    <span className="hero-live-dot" />
                    {today}
                </motion.span>

                <motion.h1 className="hero-title" variants={item}>
                    {getGreeting()},
                    <br />
                    <span>{name}</span>
                </motion.h1>

                <motion.p className="hero-text" variants={item}>
                    Manage your field employees, monitor account activity,
                    and keep track of submitted surveys from one place.
                </motion.p>

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
            </motion.div>
        </section>
    );
}

export default Hero;
