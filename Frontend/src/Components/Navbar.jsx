import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    const navStyle = {
        background: "#333",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    };

    const linkContainerStyle = {
        display: "flex",
        gap: "1rem",
    };

    const linkStyle = {
        color: "white",
        textDecoration: "none",
        padding: "0.5rem",
    };

    const activeLinkStyle = {
        fontWeight: "bold",
        borderBottom: "2px solid #da5e5eff",
    };

    return (
        <nav style={navStyle}>
            <div>
                <Link to="/" style={{ ...linkStyle, fontSize: "1.5rem" }}>
                    Digital Invites
                </Link>
            </div>
            <div style={linkContainerStyle}>
                <NavLink to="/" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}>Home</NavLink>
                {isAuthenticated ? (
                    <>
                        <NavLink to="/profile" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}>Profile</NavLink>
                        <button onClick={logout} style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}>Login</NavLink>
                        <NavLink to="/register" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}>Register</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
