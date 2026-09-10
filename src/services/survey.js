import { supabase } from "../lib/supabase";

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