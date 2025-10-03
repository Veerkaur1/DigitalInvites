import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const { id } = useParams(); // dynamic id from URL
    const navigate = useNavigate(); // for redirect

    const [formData, setFormData] = useState({
        full_name: "",
        company_name: "",
        avatar_url: ""
    });

    const [success, setSuccess] = useState("");

    useEffect(() => {
        // Fetch profile details when page loads
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/profiles/${id}`);
                setFormData(res.data); // assuming API returns profile object
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `http://localhost:5000/api/profiles/${id}`,
                formData
            );
            setSuccess("✅ Profile updated successfully!");
            console.log("Updated:", res.data);

            // Redirect after 2 seconds
            setTimeout(() => {
                navigate("/ProfilesList");
            }, 2000);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                <input
                    name="full_name"
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="border p-2"
                />
                <input
                    name="company_name"
                    placeholder="Enter your company name"
                    value={formData.company_name}
                    onChange={handleChange}
                    className="border p-2"
                />
                <input
                    name="avatar_url"
                    placeholder="Enter your avatar url"
                    value={formData.avatar_url}
                    onChange={handleChange}
                    className="border p-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Update Profile
                </button>
            </form>

            {/* ✅ Show success message */}
            {success && <p className="text-green-600 mt-4">{success}</p>}
        </div>
    );
};

export default Profile;
