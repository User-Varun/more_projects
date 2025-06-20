import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignUpForm from "./pages/SignUpPage";
import LoginForm from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utilites/protectRoute";
import PostStudentGrievance from "./components/postStudentGrievance";
import RoommateMatch from "./components/roomMateMatch";
import GrievanceList from "./components/grievanceList"; // Uncomment if needed

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes for Dashboard */}
          <Route index element={<Navigate to="/" />} />
          <Route path="find-roommate" element={<RoommateMatch />} />
          <Route path="post-grievance" element={<PostStudentGrievance />} />
          <Route path="all-grievances" element={<GrievanceList />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
