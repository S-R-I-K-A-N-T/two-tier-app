import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/users/user-profile")
      .then((res) => setProfile(res.data))
      .catch((err) => {
        const status = err.response?.status;
        console.error("Profile error:", err.response || err);
        setError(status ? `Server returned ${status}` : "No response from server (backend down or CORS)");
      });
  }, []);

  const details = profile || user; // fall back to login data

  return (
    <div className="card">
      <h2>My Profile</h2>
      {error && <p className="error">{error}</p>}
      {details && (
        <>
          {profile?.id && <p><b>ID:</b> {profile.id}</p>}
          <p><b>Name:</b> {details.username}</p>
          <p><b>Email:</b> {details.email}</p>
          <p><b>Role:</b> {details.role}</p>
        </>
      )}
      <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>
    </div>
  );
}