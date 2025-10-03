import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../apis";

const ProfilesList = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                setLoading(true);
                const res = await API.get("/profiles/me"); // fetch all profiles
                setProfiles(res.data);
                console.log("isha", res.data)
            } catch (err) {
                setError(err.response?.data?.error || "Error fetching profiles");
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">All Profiles</h1>
            <ul className="space-y-4">
                {profiles.map((profile) => (
                    <li key={profile.id} className="p-4 border rounded-lg shadow-sm flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {profile.avatar_url ? (
                                <img
                                    src={profile.avatar_url}
                                    alt="avatar"
                                    className="w-12 h-12 rounded-full"
                                />
                            ) : (
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                    <span className="text-gray-600">👤</span>
                                </div>
                            )}
                            <div>
                                <p className="font-medium">{profile.full_name || "No Name"}</p>
                                <p className="text-gray-500">@{profile.username || "unknown"}</p>
                            </div>
                        </div>
                        <Link
                            to={`/profile/${profile.id}`}
                            className="text-blue-600 hover:underline"
                        >
                            View
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProfilesList;
