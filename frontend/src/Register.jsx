import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css"; // ✅ Import the CSS file

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/signup/", formData);
      if (res.status === 201) {
        setMessage("✅ Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error) {
        setMessage("❌ " + err.response.data.error);
      } else {
        setMessage("❌ Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        <p className="register-subtitle">Join us and get started today!</p>

        {message && <p className="register-message">{message}</p>}

        <form onSubmit={handleSubmit} className="register-form">
          <label className="input-label">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="register-input"
            placeholder="Enter your username"
          />

          <label className="input-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="register-input"
            placeholder="Enter your email"
          />

          <label className="input-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="register-input"
            placeholder="Enter your password"
          />

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <p className="register-footer">
          Already have an account?{" "}
          <Link to="/" className="register-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
