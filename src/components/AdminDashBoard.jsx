import AddEmployee from "./AddEmployee";
import EmployeeList from "./EmployeeList";
import SurveyList from "./SurveyList";
import Navbar from "./Navbar";
import "../styles/AdminDashBoard.css";
import { Modal } from "antd";
import { useState } from "react";

function AdminDashBoard({ user, onLogout }) {
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        setShowLogoutConfirm(false);
        onLogout();
    };

    return (
        <div className="dashboard">
            {/* Navbar */}
            <Navbar
                user={user}
                onLogout={() => setShowLogoutConfirm(true)}
            />

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

            <Modal
                title="Confirm Logout"
                open={showLogoutConfirm}
                centered
                width={400}
                closable={false}
                keyboard={false}
                destroyOnHidden
                onCancel={() => setShowLogoutConfirm(false)}
                onOk={handleLogout}
                okText="Logout"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to logout?</p>
            </Modal>
        </div>
    );
}

export default AdminDashBoard;