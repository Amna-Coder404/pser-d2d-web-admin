import AddEmployee from "./AddEmployee";
import EmployeeList from "./EmployeeList";
import SurveyList from "./SurveyList";
import "../styles/AdminDashBoard.css";
import { Modal, Button, Avatar } from "antd";
import { useState } from "react";

import logo from "../assets/images/logo.png";

function AdminDashBoard({ user, onLogout }) {
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = async () => {

        setShowLogoutConfirm(false);
        onLogout()
    }
    return (
        <div className="dashboard">

            {/* Header */}
            <header className="dashboard-header">
                <div className="dashboard-brand">
                    <img
                        src={logo}
                        alt="PSER D2D Logo"
                        className="dashboard-logo"
                    />
                    <div className="dashboard-brand">
                        <h1>PSER D2D</h1>
                        <p>Admin Dashboard</p>
                    </div>
                </div>
                <div className="admin-profile">

                    <Avatar size={44} className="admin-avatar">
                        {user.full_name?.charAt(0)?.toUpperCase()}
                    </Avatar>

                    <div className="admin-info">
                        <strong>{user.full_name}</strong>
                        <span>{user.role}</span>
                    </div>


                    <Button
                        className="logout-btn"
                        onClick={() => setShowLogoutConfirm(true)}
                    >
                        Logout
                    </Button>

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

            <Modal
                title="Confirm Logout"
                open={showLogoutConfirm}
                centered
                width={400}
                closable={false}
                maskClosable={false}
                keyboard={false}
                destroyOnHidden
                onCancel={() => setShowLogoutConfirm(false)}
                onOk={handleLogout}
                okText="Logout"
                cancelText="Cancel"
                okButtonProps={{
                    danger: true,
                }}
            >
                <p>
                    Are you sure you want to logout?
                </p>
            </Modal>
        </div>
    );
}

export default AdminDashBoard;