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
            body.append(
                "block_assign_number",
                formData.block_assign_number
            );
            body.append("password", formData.password);

            if (profileImage) {
                body.append("profile_image", profileImage);
            }

            // CALL EDGE FUNCTION
            const {
                data,
                error: functionError,
            } = await supabase.functions.invoke(
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
            setSuccess(
                profileImage
                    ? "Employee and profile image created successfully."
                    : "Employee created successfully."
            );

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

    return {
        formData,
        profileImage,
        loading,
        error,
        success,
        handleChange,
        handleImageChange,
        handleSubmit,
    };
}

export default useAddEmployee;