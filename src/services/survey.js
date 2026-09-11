import { supabase } from "../lib/supabase";

// Get EmployeeList
export const getAllEmployees = async () => {
    const { data, error } = await supabase.from("profiles")
        .select("*")
        .eq("role", "employee")
        .order("created_at", { ascending: false });


    if (error) {
        throw new Error(error.message);
    }

    return data || [];
}



// Toggle employee active/inactive status
export const toggleEmployeeStatus = async (employeeId, isActive) => {
    const { data, error } = await supabase
        .from("profiles")
        .update({
            is_active: isActive,
        })
        .eq("id", employeeId)
        .eq("role", "employee")
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}


// Get all surveys
export const getAllSurveys = async () => {
    const { data, error } = await supabase
        .from("pser_submissions")
        .select("*");



    if (error) {
        throw new Error(error.message);
    }

    return data || [];
};



// Get Servey with employeeId

export const getSurveyWithEmployeeProfile = async (employeeId) => {
    console.log("LOOKING FOR EMPLOYEE:", employeeId);

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", employeeId);

    console.log("EMPLOYEE DATA:", data);
    console.log("EMPLOYEE ERROR:", error);

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
};


// Update Emp block assgin numer by admin 

export const updateEmployeeBlock = async (employeeId, blockNumber) => {
    const { data, error } = await supabase
        .from("profiles")
        .update({
            block_assign_number: blockNumber,
        })
        .eq("id", employeeId)
        .eq("role", "employee")
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};


// GEt User Image public url
export const getPublicUrl = (imagePath) => {
    if (!imagePath) return null;

    const { data } = supabase
        .storage
        .from("employee-images")
        .getPublicUrl(imagePath || "");
    console.log("PUBLIC URL:", data.publicUrl);
    return data.publicUrl;
}