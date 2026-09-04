import useAddEmployee from "../hooks/useAddEmployee";

function AddEmployee() {
    const {
        formData,
        profileImage,
        loading,
        error,
        success,
        handleChange,
        handleImageChange,
        handleSubmit,
    } = useAddEmployee();


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
                <div>
                    <label>Profile Image</label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    {profileImage && (
                        <p>
                            Selected: {profileImage.name}
                        </p>
                    )}
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