import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const getUserIdFromToken = () => {
  // Retrieve the JWT from cookies
  const token = Cookies.get("jwt"); // Replace "jwt" with your cookie name

  if (!token) {
    console.error("No JWT found in cookies.");
    return null;
  }

  try {
    // Decode the token to extract the payload
    const decodedToken = jwtDecode(token); // Decodes the entire token
    return decodedToken.userId || decodedToken.id; // Return the user ID (modify based on your API structure)
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

export default getUserIdFromToken;
