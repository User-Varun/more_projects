import React, { useState } from "react";
import axios from "axios";
import styles from "../css/signup.module.css"; // Import the CSS file
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// import LoginForm from "./LoginPage";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    habitsAndPreference: [{ habit: "", preference: "" }],
  });

  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleHabitChange = (index, field, value) => {
    const updatedHabits = [...formData.habitsAndPreference];
    updatedHabits[index][field] = value;
    setFormData({
      ...formData,
      habitsAndPreference: updatedHabits,
    });
  };

  const handleAddHabit = () => {
    setFormData({
      ...formData,
      habitsAndPreference: [
        ...formData.habitsAndPreference,
        { habit: "", preference: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match before submitting
    if (formData.password !== formData.passwordConfirm) {
      setStatusMessage("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/students/signup",
        formData
      );

      if (response.status === 201) {
        setStatusMessage("Signup successful!");
        console.log("Success:", response.data);
        // Cookies.set("name", response.data.data.user.);
        Cookies.set("jwt", response.data.token, { expires: 5 }); // 5 day expiration
        Cookies.set("name", response.data.data.user.name, { expires: 5 }); // 5 day expiration
        Cookies.set("email", response.data.data.user.email, { expires: 5 }); // 5 day expiration
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      if (error.response) {
        setStatusMessage(`Signup failed: ${error.response.data.message}`);
        console.error("Error:", error.response.data);
      } else {
        setStatusMessage("Signup failed: Unable to connect to the server.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <div
      className={styles.signupPage}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
      }}
    >
      <div className="container" style={{ width: "400px" }}>
        <form className="registration-form" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.passwordConfirm}
            onChange={(e) => handleChange("passwordConfirm", e.target.value)}
            required
          />

          <h3>Habits and Preferences</h3>
          {formData.habitsAndPreference.map((item, index) => (
            <div className="habit-group" key={index}>
              <input
                type="text"
                placeholder="Habit"
                value={item.habit}
                onChange={(e) =>
                  handleHabitChange(index, "habit", e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Preference"
                value={item.preference}
                onChange={(e) =>
                  handleHabitChange(index, "preference", e.target.value)
                }
                required
              />
            </div>
          ))}
          <button
            type="button"
            className="add-more-btn"
            onClick={handleAddHabit}
          >
            Add Another Habit
          </button>

          <button type="submit">Register</button>
          <p className="status-message">{statusMessage}</p>
          <Link to="/login">
            <p style={{ marginTop: "15px", color: "white" }}>
              Already have an account? Login
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
