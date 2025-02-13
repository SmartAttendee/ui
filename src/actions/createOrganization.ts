"use server";

import { connectDB } from "@/lib/connectDb";
import Organization from "@/models/organization.models";

export const createOrganization = async (formData: FormData) => {
  try {
    connectDB();

    const organizationBody = {
      organizationName: formData.get("organizationName"),
      country: formData.get("country"),
      email: formData.get("email"),
      industry: formData.get("industry"),
      size: formData.get("size"),
    };

    await Organization.create(organizationBody);

    return { message: "Organization created successfully" };
  } catch (error) {
    console.log("Error creating organization:", error);
    return { error: "Error creating organization" };
  }
};
