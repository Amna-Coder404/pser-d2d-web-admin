import { supabase } from "../lib/supabase";

const PROFILE_FIELDS = `
  id,
  full_name,
  role,
  cnic,
  block_assign_number
`;

// Get admin profile
const getAdminProfile = async (userId) => {
    const { data: profile, error } = await supabase
        .from("profiles")
        .select(PROFILE_FIELDS)
        .eq("id", userId)
        .single();

    if (error || !profile) {
        return {
            profile: null,
            error: "Profile not found.",
        };
    }

    if (profile.role !== "admin") {
        return {
            profile: null,
            error: "Access denied. Admin account required.",
        };
    }

    return {
        profile,
        error: null,
    };
};

// Login admin
export const loginAdmin = async (email, password) => {
    const {
        data,
        error: loginError,
    } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (loginError) {
        return {
            profile: null,
            error: loginError.message,
        };
    }

    const {
        profile,
        error: profileError,
    } = await getAdminProfile(data.user.id);

    if (profileError || !profile) {
        await supabase.auth.signOut();

        return {
            profile: null,
            error: profileError || "Profile not found.",
        };
    }

    return {
        profile,
        error: null,
    };
};

// Logout
export const logoutAdmin = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log("LOGOUT ERROR:", error);

        return {
            success: false,
            error: error.message,
        };
    }

    return {
        success: true,
        error: null,
    };
};

// Check existing session
export const getCurrentAdmin = async () => {
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return {
            profile: null,
            error: null,
        };
    }

    const {
        profile,
        error,
    } = await getAdminProfile(session.user.id);

    if (!profile || error) {
        await supabase.auth.signOut();

        return {
            profile: null,
            error: null,
        };
    }

    return {
        profile,
        error: null,
    };
};