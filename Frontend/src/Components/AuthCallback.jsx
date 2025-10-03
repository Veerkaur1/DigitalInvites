import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
    const [message, setMessage] = useState("Confirming your email...");
    const navigate = useNavigate();

    useEffect(() => {
        // Supabase already verifies the email when the user clicks
        // So we just show a success message and redirect to login
        const timer = setTimeout(() => {
            setMessage("Email confirmed! Redirecting to login...");
            navigate("/login");
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-2xl font-bold mb-4">{message}</h1>
            <p>You will be redirected shortly.</p>
        </div>
    );
};

export default AuthCallback;
