import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      navigate("/login");
    } catch (err) {
      const data = err.response?.data;
      const fieldErrors = data?.errors ? Object.values(data.errors).join(", ") : "";
      setError(fieldErrors || data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <p className="error">{error}</p>}
      <input name="username" placeholder="Full name" value={form.username}
             onChange={handleChange} required minLength={3} />
      <input name="email" type="email" placeholder="Email address" value={form.email}
             onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password (min 6 characters)"
             value={form.password} onChange={handleChange} required minLength={6} />
      <button type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Get my free quote"}
      </button>
    </form>
  );
}