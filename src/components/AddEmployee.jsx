import useAddEmployee from "../hooks/useAddEmployee";

import "../styles/AddEmployee.css"

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
        <div className="add-employee">

            {/* Left Content */}
            <div className="add-employee-intro">

                <div className="intro-image">
                    <div className="intro-image-overlay">
                        <span>PSER D2D</span>
                    </div>
                </div>

                <div className="intro-content">
                    <span className="intro-label">EMPLOYEE MANAGEMENT</span>

                    <h2>Add a new employee</h2>

                    <p>
                        Create an employee account and assign
                        their survey block from one simple form.
                    </p>

                    <div className="intro-points">
                        <div>
                            <span>01</span>
                            <p>Employee account</p>
                        </div>

                        <div>
                            <span>02</span>
                            <p>Block assignment</p>
                        </div>

                        <div>
                            <span>03</span>
                            <p>Secure access</p>
                        </div>
                    </div>
                </div>

            </div>


            {/* Right Form */}
            <div className="add-employee-form-area">

                <div className="form-top">
                    <span>Add Employee</span>
                    <p>Enter employee information below.</p>
                </div>

                <form
                    className="add-employee-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-row">

                        <div className="form-group">
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

                        <div className="form-group">
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

                    </div>


                    <div className="form-row">

                        <div className="form-group">
                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Employee email address"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Block Assignment</label>

                            <input
                                type="text"
                                name="block_assign_number"
                                value={formData.block_assign_number}
                                onChange={handleChange}
                                placeholder="Block assignment number"
                                required
                            />
                        </div>

                    </div>


                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create employee password"
                            required
                        />
                    </div>


                    <div className="form-group profile-image-group">
                        <label>Profile Image</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        {profileImage && (
                            <p className="selected-file">
                                Selected: {profileImage.name}
                            </p>
                        )}
                    </div>


                    {error && (
                        <p className="form-message error">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="form-message success">
                            {success}
                        </p>
                    )}


                    <button
                        className="create-employee-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Employee"}
                    </button>

                </form>

            </div>

        </div>
    );


}

export default AddEmployee;