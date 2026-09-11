import React from "react";
import logo from "../assets/images/logo.png";

const style = {
    page: {
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
            "radial-gradient(circle at center, #151515 0%, #0b0b0b 42%, #050505 100%)",
        overflow: "hidden",
    },

    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
    },

    logoContainer: {
        position: "relative",
        width: "110px",
        height: "110px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    glow: {
        position: "absolute",
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        background: "rgba(255, 255, 255, 0.08)",
        filter: "blur(22px)",
        animation: "pulseGlow 2s ease-in-out infinite",
    },

    ring: {
        position: "absolute",
        width: "102px",
        height: "102px",
        borderRadius: "50%",
        border: "1px solid #292929",
        borderTopColor: "#ffffff",
        borderRightColor: "#777777",
        animation: "spin 1.2s linear infinite",
    },

    innerRing: {
        position: "absolute",
        width: "88px",
        height: "88px",
        borderRadius: "50%",
        border: "1px solid #1f1f1f",
        borderBottomColor: "#555555",
        animation: "reverseSpin 2s linear infinite",
    },

    logoWrapper: {
        position: "relative",
        zIndex: 2,

        width: "70px",
        height: "70px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        borderRadius: "18px",

        background:
            "linear-gradient(145deg, #191919, #0d0d0d)",

        border: "1px solid #303030",

        boxShadow:
            "0 12px 35px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.06)",
    },

    logo: {
        width: "54px",
        height: "54px",
        objectFit: "contain",
    },

    title: {
        margin: "24px 0 0",

        color: "#f5f5f5",

        fontSize: "20px",
        fontWeight: "700",

        letterSpacing: "-0.4px",
    },

    subtitle: {
        margin: "6px 0 0",

        color: "#707070",

        fontSize: "12px",
        fontWeight: "500",

        letterSpacing: "0.2px",
    },

    loadingBar: {
        marginTop: "22px",

        width: "110px",
        height: "2px",

        overflow: "hidden",

        borderRadius: "10px",

        background: "#1d1d1d",
    },

    loadingProgress: {
        width: "45%",
        height: "100%",

        borderRadius: "10px",

        background:
            "linear-gradient(90deg, transparent, #ffffff, transparent)",

        animation: "loadingBar 1.5s ease-in-out infinite",
    },
};

function Loader() {
    return (
        <div style={style.page}>

            <div style={style.content}>

                {/* Logo + Animated Rings */}
                <div style={style.logoContainer}>

                    <div style={style.glow}></div>

                    <div style={style.ring}></div>

                    <div style={style.innerRing}></div>

                    <div style={style.logoWrapper}>
                        <img
                            src={logo}
                            alt="PSER D2D"
                            style={style.logo}
                        />
                    </div>

                </div>

                {/* Brand */}
                <h2 style={style.title}>
                    PSER D2D
                </h2>

                <p style={style.subtitle}>
                    Initializing dashboard...
                </p>

                {/* Loading bar */}
                <div style={style.loadingBar}>
                    <div style={style.loadingProgress}></div>
                </div>

            </div>

            <style>
                {`
                    @keyframes spin {
                        from {
                            transform: rotate(0deg);
                        }

                        to {
                            transform: rotate(360deg);
                        }
                    }

                    @keyframes reverseSpin {
                        from {
                            transform: rotate(360deg);
                        }

                        to {
                            transform: rotate(0deg);
                        }
                    }

                    @keyframes pulseGlow {
                        0%, 100% {
                            opacity: 0.35;
                            transform: scale(0.9);
                        }

                        50% {
                            opacity: 0.7;
                            transform: scale(1.1);
                        }
                    }

                    @keyframes loadingBar {
                        0% {
                            transform: translateX(-120%);
                        }

                        100% {
                            transform: translateX(280%);
                        }
                    }
                `}
            </style>

        </div>
    );
}

export default Loader;