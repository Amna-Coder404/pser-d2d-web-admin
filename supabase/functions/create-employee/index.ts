import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

export default {
  fetch: withSupabase(
    { auth: "user" },
    async (req, ctx) => {
      try {
        // Get authenticated admin
        const user = ctx.userClaims;

        if (!user) {
          return Response.json(
            { error: "You must be logged in." },
            { status: 401 }
          );
        }

        // Check admin role
        const { data: adminProfile, error: adminError } =
          await ctx.supabaseAdmin
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();



        if (
          adminError ||
          adminProfile?.role !== "admin"
        ) {
          return Response.json(
            {
              error:
                "Only admins can create employees.",
            },
            { status: 403 }
          );
        }

        // Read multipart form
        const formData = await req.formData();

        const full_name =
          formData.get("full_name")?.toString();

        const cnic =
          formData.get("cnic")?.toString();

        const email =
          formData.get("email")?.toString();

        const block_assign_number =
          formData
            .get("block_assign_number")
            ?.toString();

        const password =
          formData.get("password")?.toString();

        const profileImage =
          formData.get("profile_image");

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
        } =
          await ctx.supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
          });

        if (createUserError) {
          return Response.json(
            { error: createUserError.message },
            { status: 400 }
          );
        }

        const employeeId =
          employeeAuth.user.id;

        // Create employee profile
        const { error: profileError } =
          await ctx.supabaseAdmin
            .from("profiles")
            .insert({
              id: employeeId,
              full_name,
              cnic,
              block_assign_number,
              role: "employee",
            });

        // Rollback Auth user if profile fails
        if (profileError) {

          await ctx.supabaseAdmin.auth.admin.deleteUser(
            employeeId
          );

          return Response.json(
            { error: profileError.message },
            { status: 400 }
          );
        }

        // Upload profile image
        let imagePath = null;

        if (
          profileImage &&
          profileImage instanceof File
        ) {
          const fileExtension =
            profileImage.name
              .split(".")
              .pop() || "jpg";

          imagePath =
            `${employeeId}/profile.${fileExtension}`;



          const { error: uploadError, } = await ctx.supabaseAdmin.storage
            .from("employee-images")
            .upload(
              imagePath,
              profileImage,
              {
                cacheControl: "3600",
                upsert: true,
                contentType:
                  profileImage.type,
              }
            );

          if (uploadError) {

            // Remove employee if image upload fails
            await ctx.supabaseAdmin
              .from("profiles")
              .delete()
              .eq("id", employeeId);

            await ctx.supabaseAdmin.auth.admin.deleteUser(
              employeeId
            );

            return Response.json(
              {
                error:
                  `Image upload failed: ${uploadError.message}`,
              },
              { status: 400 }
            );
          }

          // Save image path
          const { error: imagePathError, } = await ctx.supabaseAdmin
            .from("profiles")
            .update({
              profile_image_url: imagePath,
            })
            .eq("id", employeeId);

          if (imagePathError) {
            await ctx.supabaseAdmin.storage
              .from("employee-images")
              .remove([imagePath]);

            await ctx.supabaseAdmin
              .from("profiles")
              .delete()
              .eq("id", employeeId);

            await ctx.supabaseAdmin.auth.admin.deleteUser(
              employeeId
            );

            return Response.json(
              {
                error:
                  `Image path could not be saved: ${imagePathError.message}`,
              },
              { status: 400 }
            );
          }
        }

        // Success
        return Response.json({
          success: true,
          message:
            "Employee created successfully.",
          employee: {
            id: employeeId,
            full_name,
            email,
            cnic,
            block_assign_number,
            role: "employee",
            profile_image_url:
              imagePath,
          },
        });
      } catch (error) {

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