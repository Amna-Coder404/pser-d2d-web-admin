import { useState } from "react";
import "../styles/EmployeeCard.css"
import { getPublicUrl } from "../services/survey";
import { Button } from "antd";

import { ChevronDown, ChevronUp } from "lucide-react";


function EmployeeCard({ employee, onToggleStatus, updating }) {
    const [expanded, setExpanded] = useState(false);
    const imageUrl = getPublicUrl(employee.profile_image_url)

    return (
        <div className={`employee-card ${expanded ? "expanded" : ""}`}>
            {/* Compact Row */}
            <div className="employee-row">

                <div
                    className="employee-summary"
                    onClick={() => setExpanded(!expanded)}  >
                    {employee?.profile_image_url ? (
                        <img
                            src={imageUrl}
                            alt={employee?.full_name || "Employee"}
                            className="employee-avatar"
                        />
                    ) : (
                        <div className="employee-avatar">
                            {employee.full_name
                                ?.charAt(0)
                                ?.toUpperCase()}
                        </div>
                    )}


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
                    <Button
                        className={`employee-status-btn ${employee.is_active ? "deactivate" : "activate"
                            }`}
                        type={employee.is_active ? "default" : "primary"}
                        danger={employee.is_active}
                        onClick={() => onToggleStatus(employee)}
                        loading={updating}
                    >
                        {updating ? "Updating..." : employee.is_active ? "Deactivate" : "Activate"}
                    </Button>

                    <button
                        className="expand-btn"
                        onClick={() => setExpanded(!expanded)}
                        aria-label={expanded ? "Collapse employee details" : "Expand employee details"}
                    >
                        {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                </div>
            </div>

            {/* Expanded Details */}
            {expanded && (
                <div className="employee-container">
                    <div className="employee-expanded-profile">
                        {employee?.profile_image_url ? (
                            <img
                                src={imageUrl}
                                alt={employee?.full_name || "Employee"}
                                className="employee-large-image"
                            />
                        ) : (
                            <div className="employee-large-image employee-image-fallback">
                                {employee?.full_name
                                    ?.charAt(0)
                                    ?.toUpperCase()}
                            </div>
                        )}
                    </div>
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
                </div>
            )}
        </div>
    );
}

export default EmployeeCard;