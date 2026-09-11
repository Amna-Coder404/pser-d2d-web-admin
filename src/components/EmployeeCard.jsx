import { useState } from "react";

function EmployeeCard({ employee, onToggleStatus, updating }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`employee-card ${expanded ? "expanded" : ""}`}>
            {/* Compact Row */}
            <div className="employee-row">

                <div
                    className="employee-summary"
                    onClick={() => setExpanded(!expanded)}  >
                    <div className="employee-avatar">
                        {employee.full_name
                            ?.charAt(0)
                            ?.toUpperCase()}
                    </div>

                    <div className="employee-name">
                        <h3>{employee.full_name}</h3>

                        <span className={employee.is_active ? "status active" : "status inactive"
                        }  >
                            <span className="status-dot"></span>

                            {employee.is_active ? "Active" : "Inactive"}
                        </span>
                    </div>
                </div>

                <div className="employee-actions">
                    <button
                        className={
                            employee.is_active
                                ? "deactivate-btn"
                                : "activate-btn"
                        }
                        onClick={() => onToggleStatus(employee)}
                        disabled={updating}
                    >
                        {updating
                            ? "Updating..."
                            : employee.is_active
                                ? "Deactivate"
                                : "Activate"}
                    </button>

                    <button
                        className="expand-btn"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? "↑" : "↓"}
                    </button>
                </div>
            </div>

            {/* Expanded Details */}
            {expanded && (
                <div className="employee-details">

                    <div className="detail">
                        <span>Full Name</span>
                        <strong>
                            {employee.full_name || "N/A"}
                        </strong>
                    </div>

                    <div className="detail">
                        <span>Role</span>
                        <strong>
                            {employee.role || "N/A"}
                        </strong>
                    </div>

                    <div className="detail">
                        <span>CNIC</span>
                        <strong>
                            {employee.cnic || "N/A"}
                        </strong>
                    </div>

                    <div className="detail">
                        <span>Block Assign</span>
                        <strong>
                            {employee.block_assign_number || "N/A"}
                        </strong>
                    </div>

                    <div className="detail">
                        <span>Status</span>
                        <strong>
                            {employee.is_active
                                ? "Active"
                                : "Inactive"}
                        </strong>
                    </div>

                    <div className="detail">
                        <span>Created</span>
                        <strong>
                            {employee.created_at
                                ? new Date(
                                    employee.created_at
                                ).toLocaleDateString()
                                : "N/A"}
                        </strong>
                    </div>

                </div>
            )}
        </div>
    );
}

export default EmployeeCard;