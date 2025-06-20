import React, { useEffect, useState } from "react";
import axios from "axios";
import getUserIdFromToken from "../utilites/getUserIdFromToken";
import Cookies from "js-cookie";

const RoommateMatch = () => {
  const [bestMatch, setBestMatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoommateMatch = async () => {
      const userId = getUserIdFromToken(); // Get the current user's ID
      if (!userId) {
        setError("Failed to retrieve user ID.");
        return;
      }

      const token = Cookies.get("jwt"); // Retrieve JWT from cookies
      if (!token) {
        throw new Error("No authorization token found. Please log in.");
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/students/${userId}/findBestRoomMate`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add Authorization header
            },
          }
        );
        setBestMatch(response.data);
      } catch (err) {
        setError("Failed to fetch roommate match.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoommateMatch();
  }, []);

  console.log(bestMatch);
  return (
    <div>
      {/* <h1>Find Your Best Roommate Match</h1> */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {bestMatch && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            marginTop: "4rem",
          }}
        >
          <h2>
            Best Room-mate Match According to Your habits and preferences{" "}
          </h2>
          <p>
            <strong>Name:</strong> {bestMatch.bestRoommate.name}
          </p>
          <p>
            <strong>Email:</strong> {bestMatch.bestRoommate.email}
          </p>
          <p>
            <strong>Habit:</strong>{" "}
            {bestMatch.bestRoommate.habitsAndPreference[0].habit}
          </p>
          <p>
            <strong>Preference:</strong>{" "}
            {bestMatch.bestRoommate.habitsAndPreference[0].preference}
          </p>
        </div>
      )}
    </div>
  );
};

export default RoommateMatch;
