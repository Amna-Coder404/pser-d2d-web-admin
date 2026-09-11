import useAddEmployee from "../hooks/useAddEmployee";

import "../styles/AddEmployee.css"
import { motion } from "motion/react";


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

    const inputAnimation = {
        initial: {
            opacity: 0,
            y: 35,
        },
        whileInView: {
            opacity: 1,
            y: 0,
        },
        viewport: {
            once: false,
            amount: 0.25,
        },
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    };

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

                        <motion.div
                            className="form-group"
                            {...inputAnimation}
                        >
                            <label>Full Name</label>

                            <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                placeholder="Employee full name"
                                required
                            />
                        </motion.div>

                        <motion.div
                            className="form-group"
                            {...inputAnimation}
                        >
                            <label>CNIC</label>

                            <input
                                type="text"
                                name="cnic"
                                value={formData.cnic}
                                onChange={handleChange}
                                placeholder="Employee CNIC"
                                required
                            />
                        </motion.div>

                    </div>


                    <div className="form-row">

                        <motion.div
                            className="form-group"
                            {...inputAnimation}
                        >
                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Employee email address"
                                required
                            />
                        </motion.div>

                        <motion.div
                            className="form-group"
                            {...inputAnimation}
                        >
                            <label>Block Assignment</label>

                            <input
                                type="text"
                                name="block_assign_number"
                                value={formData.block_assign_number}
                                onChange={handleChange}
                                placeholder="Block assignment number"
                                required
                            />
                        </motion.div>

                    </div>


                    <motion.div
                        className="form-group"
                        {...inputAnimation}
                    >
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create employee password"
                            required
                        />
                    </motion.div>

                    <motion.div
                        className="form-group profile-image-group"
                        {...inputAnimation}
                    >

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
                    </motion.div>


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

            </div >

        </div >
    );


}

export default AddEmployee;