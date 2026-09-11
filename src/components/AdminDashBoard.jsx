import AddEmployee from "./AddEmployee";
import EmployeeList from "./EmployeeList";
import SurveyList from "./SurveyList";
import { motion } from "motion/react";
import "../styles/AdminDashBoard.css";

function AdminDashBoard({ user, onLogout }) {
    return (
        <div className="dashboard">

            {/* Header */}
            <header className="dashboard-header">

                <div className="dashboard-brand">
                    <h1>PSER D2D</h1>
                    <p>Admin Dashboard</p>
                </div>

                <div className="admin-profile">

                    <div className="admin-avatar">
                        {user.full_name
                            ?.charAt(0)
                            ?.toUpperCase()}
                    </div>

                    <div className="admin-info">
                        <strong>{user.full_name}</strong>
                        <span>{user.role}</span>
                    </div>

                    <button
                        className="logout-button"
                        onClick={onLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>

            {/* Main */}
            <main className="dashboard-content">

                {/* Employees */}
                <section className="dashboard-section">

                    <EmployeeList />
                </section>

                {/* Add Employee */}
                <section className="dashboard-section">
                    <div className="section-heading">
                        <h2>Add Employee</h2>
                        <p>Create a new employee account.</p>
                    </div>

                    <AddEmployee />
                </section>

                {/* Surveys */}
                <section className="dashboard-section">
                    <div className="section-heading">
                        <h2>Surveys</h2>
                        <p>View and manage submitted surveys.</p>
                    </div>

                    <SurveyList />
                </section>

            </main>

        </div>
    );
}

export default AdminDashBoard;