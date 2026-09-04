import { useState } from "react";
import { supabase } from "../lib/supabase";

function AddEmployee() {
    const [formData, setFormData] = useState({
        full_name: "",
        cnic: "",
        email: "",
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


    // After submit that create Employee
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        // Check current logged-in session
        const {
            data: { session },
        } = await supabase.auth.getSession();

        console.log("CURRENT SESSION:", session);

        const { data, error } = await supabase.functions.invoke(
            "create-employee",
            {
                body: formData,
            }
        );

        if (error) {
            console.log("FUNCTION ERROR:", error);

            const errorBody = await error.context?.json?.();

            console.log("FUNCTION ERROR BODY:", errorBody);

            setError(
                errorBody?.error || error.message
            );

            setLoading(false);
            return;
        }

        if (data?.error) {
            setError(data.error);
            setLoading(false);
            return;
        }

        setSuccess("Employee created successfully.");

        setFormData({
            full_name: "",
            cnic: "",
            email: "",
            block_assign_number: "",
            password: "",
        });

        setLoading(false);
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
                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address "
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