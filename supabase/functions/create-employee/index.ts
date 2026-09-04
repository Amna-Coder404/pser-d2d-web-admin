import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

export default {
  fetch: withSupabase(
    { auth: "user" },
    async (req, ctx) => {
      try {
        // Get authenticated user
        const user = ctx.userClaims;

        console.log("AUTH USER:", user);

        if (!user) {
          return Response.json(
            { error: "You must be logged in." },
            { status: 401 }
          );
        }

        // Check admin role
        const { data: adminProfile, error: adminError } =
          await ctx.supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        console.log("ADMIN PROFILE:", adminProfile);
        console.log("ADMIN PROFILE ERROR:", adminError);

        if (adminError || adminProfile?.role !== "admin") {
          return Response.json(
            { error: "Only admins can create employees." },
            { status: 403 }
          );
        }

        // Get employee data
        const {
          full_name,
          email,
          cnic,
          block_assign_number,
          password,
        } = await req.json();

        // Validate fields
        if (
          !full_name ||
          !email ||
          !cnic ||
          !block_assign_number ||
          !password
        ) {
          return Response.json(
            { error: "All fields are required." },
            { status: 400 }
          );
        }

        // Create employee Auth account
        const {
          data: employeeAuth,
          error: createUserError,
        } = await ctx.supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        });

        if (createUserError) {
          console.error(
            "CREATE USER ERROR:",
            createUserError
          );

          return Response.json(
            { error: createUserError.message },
            { status: 400 }
          );
        }

        // Create employee profile
        const { error: profileError } =
          await ctx.supabaseAdmin
            .from("profiles")
            .insert({
              id: employeeAuth.user.id,
              full_name,
              cnic,
              block_assign_number,
              role: "employee",
            });

        // Rollback Auth user if profile creation fails
        if (profileError) {
          console.error(
            "PROFILE ERROR:",
            profileError
          );

          await ctx.supabaseAdmin.auth.admin.deleteUser(
            employeeAuth.user.id
          );

          return Response.json(
            { error: profileError.message },
            { status: 400 }
          );
        }

        // Success
        return Response.json({
          success: true,
          message: "Employee created successfully.",
          employee: {
            id: employeeAuth.user.id,
            full_name,
            email,
            cnic,
            block_assign_number,
            role: "employee",
          },
        });
      } catch (error) {
        console.error(
          "FUNCTION ERROR:",
          error
        );

        return Response.json(
          {
            error:
              error instanceof Error
                ? error.message
                : "Something went wrong.",
          },
          { status: 500 }
        );
      }
    }
  ),
};