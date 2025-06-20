import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/students/login",
        formData
      );
      if (response.status === 200) {
        setStatusMessage("Login successful!");
        console.log("Success:", response.data);
        Cookies.set("jwt", response.data.token, { expires: 5 });
        Cookies.set("name", response.data.data.user.name, { expires: 5 });
        Cookies.set("email", response.data.data.user.email, { expires: 5 });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      setStatusMessage("Login failed. Please try again.");
    }
  };

  return (
    <div
      className="login-page"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        background:
          "linear-gradient(to right, rgb(255 255 255), rgb(37, 117, 252))",
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="status-message">{statusMessage}</p>
      <Link to="/signup">
        <p>New To our App ? SignUp!</p>
      </Link>
    </div>
  );
};

export default LoginForm;
