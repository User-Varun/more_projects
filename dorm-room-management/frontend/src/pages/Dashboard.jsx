import { Outlet, useNavigate } from "react-router-dom"; // Use Outlet for nested routes
import styles from "../css/dashboard.module.css"; // Import styles
import Cookies from "js-cookie";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear JWT from cookies
    Cookies.remove("jwt");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 12px",
        backgroundColor: "rgb(168 170 173)",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "2px",
      }}
    >
      Logout
    </button>
  );
}

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path); // Navigate to the specific feature route
  };

  const studentName = Cookies.get("name");
  const studentEmail = Cookies.get("email");

  if (!studentName || !studentEmail) {
    throw new Error("Can not get the info from db");
  }

  return (
    <div className={styles.dashboard}>
      {/* Fixed Header */}
      <header className={styles.dashboardHeader}>
        <div className={styles.logo}>
          <h1>Hostel Hive</h1>
        </div>
        <div className={styles.headerActions}>
          <p style={{ color: "white" }}>{studentName}</p>
          <p style={{ color: "white" }}>{studentEmail}</p>

          <LogoutButton />
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.dashboardContent}>
        <div className={styles.cardContainer}>
          <div
            className={styles.card}
            onClick={() => handleCardClick("/find-roommate")}
          >
            <h3>Find Best Roommate</h3>
            <p>Discover your perfect roommate with smart matching.</p>
          </div>
          <div
            className={styles.card}
            onClick={() => handleCardClick("/post-grievance")}
          >
            <h3>Post a Student Grievance</h3>
            <p>Submit your dorm issues to seek resolution.</p>
          </div>
          <div
            className={styles.card}
            onClick={() => handleCardClick("/all-grievances")}
          >
            <h3>See All Students' Grievances</h3>
            <p>View grievances posted by others in your dorm.</p>
          </div>
        </div>

        {/* Dynamically Render Child Routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
