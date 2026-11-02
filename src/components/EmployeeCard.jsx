import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import { Button } from "antd";
import useAddEmployee from "../hooks/useAddEmployee";
import "../styles/EmployeeCard.css";
import { getPublicUrl } from "../services/survey";
import { formatCNIC } from "../utils/cnic";

function EmployeeCard({ employee, onToggleStatus, updating, onEmployeeUpdate }) {
    const [edit, setEdit] = useState(false);
    const imageUrl = getPublicUrl(employee.profile_image_url);

    const {
        edifFormData,
        handleEditChange,
        handleEditSubmit,
        setEditFormData,
        loading: editLoading,
    } = useAddEmployee();

    const handleEditClick = () => {
        setEditFormData({
            block_assign_number: employee.block_assign_number || "",
        });
        setEdit(true);
    };

    const handleSave = async () => {
        const updatedEmployee = await handleEditSubmit(employee.id, edifFormData);

        if (updatedEmployee) {
            onEmployeeUpdate(updatedEmployee);
            setEdit(false);
        }
    };

    const handleCancel = () => {
        setEdit(false);
        setEditFormData({
            block_assign_number: employee.block_assign_number || "",
        });
    };

    return (
        <div className="employee-card">
            {/* Top image */}
            <div className="card-cover">
                {employee?.profile_image_url ? (
                    <img
                        src={imageUrl}
                        alt={employee?.full_name || "Employee"}
                        className="card-image"
                    />
                ) : (
                    <div className="card-image card-image-fallback">
                        {employee.full_name?.charAt(0)?.toUpperCase()}
                    </div>
                )}

                <span
                    className={`status ${employee.is_active ? "active" : "inactive"}`}
                >
                    <span className="status-dot"></span>
                    {employee.is_active ? "Active" : "Inactive"}
                </span>
            </div>

            {/* Name + role */}
            <div className="card-body">
                <div className="card-title">
                    <h3 className="card-name">{employee.full_name}</h3>
                    <span className="card-role">{employee.role || "N/A"}</span>
                </div>

                {/* Details */}
                <div className="card-details">
                    <div className="detail-row">
                        <span className="detail-label">CNIC</span>
                        <strong className="detail-value">
                            {formatCNIC(employee.cnic) || "N/A"}
                        </strong>
                    </div>

                    <div className="detail-row">
                        <span className="detail-label">Block</span>

                        {edit ? (
                            <div className="block-edit">
                                <input
                                    type="text"
                                    name="block_assign_number"
                                    value={edifFormData.block_assign_number}
                                    onChange={handleEditChange}
                                    autoFocus
                                />
                                <button
                                    className="field-save-btn"
                                    onClick={handleSave}
                                    disabled={editLoading}
                                >
                                    <Check size={15} />
                                </button>
                                <button
                                    className="field-cancel-btn"
                                    onClick={handleCancel}
                                    disabled={editLoading}
                                >
                                    <X size={15} />
                                </button>
                            </div>
                        ) : (
                            <div className="field-value">
                                <strong className="detail-value">
                                    {employee.block_assign_number || "N/A"}
                                </strong>
                                <button
                                    className="field-edit-btn"
                                    onClick={handleEditClick}
                                    title="Edit block assignment"
                                >
                                    <Pencil size={13} />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="detail-row">
                        <span className="detail-label">Created</span>
                        <strong className="detail-value">
                            {employee.created_at
                                ? new Date(employee.created_at).toLocaleDateString()
                                : "N/A"}
                        </strong>
                    </div>
                </div>

                {/* Action */}
                <Button
                    className={`employee-status-btn ${employee.is_active ? "deactivate" : "activate"
                        }`}
                    type={employee.is_active ? "default" : "primary"}
                    danger={employee.is_active}
                    onClick={() => onToggleStatus(employee)}
                    loading={updating}
                    block
                >
                    {updating
                        ? "Updating..."
                        : employee.is_active
                            ? "Deactivate"
                            : "Activate"}
                </Button>
            </div>
        </div>
    );
}

export default EmployeeCard;