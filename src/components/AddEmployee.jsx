import { useState } from "react";

function AddEmployee() {
    const [formData, setFormData] = useState({
        full_name: "",
        cnic: "",
        block_assign_number: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        // Employee creation will be connected to
        // Supabase Edge Function in the next step.

        console.log("Employee data:", formData);

        setLoading(false);
        setSuccess("Employee form is working!");
    };

    return (
        <div>
            <h2>Add Employee</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name</label>

                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="Employee full name"
                        required
                    />
                </div>

                <div>
                    <label>CNIC</label>

                    <input
                        type="text"
                        name="cnic"
                        value={formData.cnic}
                        onChange={handleChange}
                        placeholder="Employee CNIC"
                        required
                    />
                </div>

                <div>
                    <label>Block Assignment Number</label>

                    <input
                        type="text"
                        name="block_assign_number"
                        value={formData.block_assign_number}
                        onChange={handleChange}
                        placeholder="Block assignment number"
                        required
                    />
                </div>

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Employee password"
                        required
                    />
                </div>

                {error && <p>{error}</p>}

                {success && <p>{success}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Employee"}
                </button>
            </form>
        </div>
    );
}

export default AddEmployee;