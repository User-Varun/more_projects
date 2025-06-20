import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import getUseridFromToken from "../utilites/getUserIdFromToken";

const PostStudentGrievance = ({ onGrievancePosted }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dormName, setDormName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = Cookies.get("jwt"); // Retrieve JWT from cookies
      const student_id = getUseridFromToken();
      if (!token || !student_id) {
        throw new Error("User not authenticated. Please log in.");
      }

      // Make the API call to post the grievance
      const response = await axios.post(
        `http://localhost:8000/api/v1/students/${student_id}/studentGrievance`, // Your API endpoint
        {
          title,
          description,
          dormName,
          postedBy: student_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Add Authorization header
        }
      );

      console.log("Grievance posted successfully:", response.data);

      // Clear the input fields after a successful submission
      setTitle("");
      setDescription("");
      setDormName("");

      // Notify the parent component or refresh grievances list
      if (onGrievancePosted) {
        onGrievancePosted();
      }
    } catch (err) {
      console.error(
        "Failed to post grievance:",
        err.response?.data || err.message
      );
      setError("Failed to post grievance. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "600px", margin: "auto", marginTop: "4rem" }}
    >
      <div style={{ marginBottom: "10px" }}>
        <label
          htmlFor="title"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a brief title for your grievance"
          required
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* Input for the Description */}
      <div style={{ marginBottom: "10px" }}>
        <label
          htmlFor="description"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the issue in detail"
          rows="5"
          required
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* Input for Dorm Name */}
      <div style={{ marginBottom: "10px" }}>
        <label
          htmlFor="dormName"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Dorm Name:
        </label>
        <input
          type="text"
          id="dormName"
          value={dormName}
          onChange={(e) => setDormName(e.target.value)}
          placeholder="Enter your dorm name"
          required
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* Error Message */}
      {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !title || !description || !dormName}
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Posting..." : "Post Grievance"}
      </button>
    </form>
  );
};

export default PostStudentGrievance;
