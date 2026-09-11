
import React from "react";

const style = {
    page: {
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f7fb",
    },

    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    spinner: {
        width: "38px",
        height: "38px",
        border: "3px solid #e5e7eb",
        borderTopColor: "#111827",
        borderRadius: "50%",
    },

    title: {
        margin: "16px 0 4px",
        fontSize: "18px",
        fontWeight: "700",
        color: "#111827",
    },

    text: {
        margin: 0,
        fontSize: "13px",
        color: "#6b7280",
    },
};

function Loader() {
    return (
        <div style={style.page}>
            <div style={style.content}>
                <div style={style.spinner}></div>

                <h2 style={style.title}>
                    PSER D2D
                </h2>

                <p style={style.text}>
                    Loading...
                </p>
            </div>
        </div>
    );
}

export default Loader;

