import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => {
        console.error(err);
        navigate("/");
      });
  }, [navigate]);

  const handleLogout = async () => {
    const refresh = localStorage.getItem("refresh");
    try {
      await axios.post("http://127.0.0.1:8000/task/logout/", { refresh });
    } catch (e) {
      console.error("Logout failed:", e);
    }
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Welcome, {profile.user.username}</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="space-y-4">
          <p><strong>Email:</strong> {profile.user.email}</p>
          <p><strong>Full Name:</strong> {profile.full_name || "N/A"}</p>
          <p><strong>Joined:</strong> {new Date(profile.user.date_joined).toLocaleString()}</p>
        </div>

        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Dashboard Overview</h3>
          <p className="text-gray-600">
            Here you can add tasks, notes, or any dashboard content later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
