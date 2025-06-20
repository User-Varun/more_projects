import React, { useEffect, useState } from "react";
import axios from "axios";

const GrievanceList = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrievances = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/students/studentGrievance"
        ); // Adjust the endpoint as per your API
        setGrievances(response.data.data); // Assuming the response returns an array of grievances
      } catch (err) {
        setError("Failed to fetch grievances.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrievances();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginTop: "4rem",
      }}
    >
      {loading && <p>Loading grievances...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h2>Grievance Board</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {grievances.map((grievance, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              width: "300px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              background: "#f9f9f9",
            }}
          >
            <h3>{grievance.title}</h3>
            <p style={{ marginTop: "8px" }}>
              <strong>Description:</strong> {grievance.description}
            </p>
            <p style={{ marginTop: "8px" }}>
              <strong>Submitted by:</strong> {grievance.submittedBy}
            </p>
            <p style={{ marginTop: "8px" }}>
              <strong>Status:</strong>{" "}
              {grievance.status ? grievance.status : "Pending"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrievanceList;
