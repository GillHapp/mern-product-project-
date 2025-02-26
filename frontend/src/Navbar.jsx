import React from 'react';

export default function Navbar() {
    return (
        <div style={{ width: "100%", backgroundColor: "black", padding: "8px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {/* Title */}
                <a href="/" style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    background: "linear-gradient(to right, #00bcd4, #2196f3)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    textDecoration: "none"
                }}>
                    Product Store 🛒
                </a>

                {/* Buttons */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {/* Create Page Button */}
                    <a href="/create" style={{
                        padding: "6px 12px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "black"
                    }}>
                        ➕
                    </a>

                    {/* Toggle Theme Button */}
                    <button style={{
                        padding: "6px 12px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        cursor: "pointer",
                        background: "white"
                    }}>
                        🌙
                    </button>
                </div>
            </div>
        </div>
    );
}
