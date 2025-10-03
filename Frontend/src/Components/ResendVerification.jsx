import React, { useState } from "react";
import api from "../apis";

const ResendVerification = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleResend = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/resend-verification", { email });
            setMessage(res.data.message);
            setError("");
        } catch (err) {
            setError(err.response?.data?.error || "Error sending email");
        }
    };

    return (
        <div>
            <h2>Resend Verification Email</h2>
            <form onSubmit={handleResend}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Resend</button>
            </form>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default ResendVerification;
