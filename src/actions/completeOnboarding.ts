"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  const client = await clerkClient();

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        organizationName: formData.get("organizationName"),
        industry: formData.get("industry"),
        role: "Admin",
      },
    });

    return { message: res.publicMetadata };
  } catch (error) {
    console.log(error);
    return { error: "There was an error updating the user metadata." };
  }
};
