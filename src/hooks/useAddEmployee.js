import { useState } from "react";
import { supabase } from "../lib/supabase";

function useAddEmployee() {
    const [formData, setFormData] = useState({
        full_name: "",
        cnic: "",
        email: "",
        block_assign_number: "",
        password: "",
    });



    // For Edit
    const [edifFormData, setEditFormData] = useState({
        block_assign_number: "",
    });



    const [profileImage, setProfileImage] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // HANDLE TEXT INPUTS
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleEditChange = (e) => {
        const { name, value } = e.target;

        setEditFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // HANDLE IMAGE
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            setProfileImage(null);
            return;
        }

        if (!file.type.startsWith("image/")) {
            setError("Please select an image file.");
            return;
        }

        setError("");
        setProfileImage(file);
    };

    // CREATE EMPLOYEE
    const handleSubmit = async (e) => {
        e.preventDefault();
        // CNIC validation
        const cnicRegex = /^(?:\d{13}|\d{5}-\d{7}-\d)$/;

        if (!cnicRegex.test(formData.cnic)) {
            setError("CNIC must be 13 digits or in format 35202-1234567-1.");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // CHECK SESSION
            const { data: { session }, } = await supabase.auth.getSession();

            if (!session) {
                throw new Error("You are not logged in.");
            }

            // CREATE FORMDATA
            const body = new FormData();

            body.append("full_name", formData.full_name);
            body.append("cnic", formData.cnic);
            body.append("email", formData.email);
            body.append("block_assign_number", formData.block_assign_number);
            body.append("password", formData.password);

            if (profileImage) {
                body.append("profile_image", profileImage);
            }

            // CALL EDGE FUNCTION
            const { data, error: functionError, } = await supabase.functions.invoke(
                "create-employee",
                {
                    body,
                }
            );

            if (functionError) {
                throw new Error(functionError.message);
            }

            if (data?.error) {
                throw new Error(data.error);
            }

            // SUCCESS
            setSuccess(profileImage ? "Employee and profile image created successfully." : "Employee created successfully."
            );


            setTimeout(() => {
                setSuccess("");
            }, 2000);

            // RESET
            setFormData({
                full_name: "",
                cnic: "",
                email: "",
                block_assign_number: "",
                password: "",
            });

            setProfileImage(null);

            e.target.reset();
        } catch (err) {
            console.error("CREATE EMPLOYEE ERROR:", err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };




    // EDIT ONE EMPLOYEE FIELD
    const handleEditSubmit = async (employeeId, editFormData) => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                throw new Error("You are not logged in.");
            }

            const { data, error } = await supabase
                .from("profiles")
                .update(editFormData)
                .eq("id", employeeId)
                .select()
                .single();

            if (error) {
                throw error;
            }

            setSuccess("Employee updated successfully!");

            return data;
        } catch (err) {
            console.log("EDIT Employee Error:", err);
            setError(err.message || "Failed to update employee.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        profileImage,
        loading,
        error,
        success,
        handleChange,
        handleImageChange,
        handleSubmit,


        // For Edit Mode
        edifFormData,
        setEditFormData,
        handleEditSubmit,
        handleEditChange

    };
}

export default useAddEmployee;