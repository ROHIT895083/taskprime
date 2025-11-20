import { useEffect, useState } from "react";

export default function profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch("http://127.0.0.1:8000/task/profile/", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
      .then(res => {
        if (res.status === 403) {
          window.location.href = "/login";
        }
        return res.json();
      })
      .then(data => setProfile(data));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Phone: {profile.phone}</p>
      <p>Address: {profile.address}</p>
    </div>
  );
}
