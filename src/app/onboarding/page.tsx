"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "@/actions/completeOnboarding";
import { createOrganization } from "@/actions/createOrganization";

export default function OnboardingComponent() {
  const [error, setError] = useState<string>("");
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const completeOnboardingResponse = await completeOnboarding(formData);
    const createOrganizationResponse = await createOrganization(formData);

    if (
      completeOnboardingResponse?.message &&
      createOrganizationResponse.message
    ) {
      // Reloads the user's data from the Clerk API
      await user?.reload();
      router.push("/dashboard");
    }

    if (completeOnboardingResponse?.error || createOrganizationResponse.error) {
      setError(
        completeOnboardingResponse?.error ||
          (createOrganizationResponse.error as string)
      );
    }
  };

  return (
    <div className="w-full h-screen flex items-start justify-center">
      <div className="w-[400px] md:w-[450px] mt-20 py-5 px-5 flex flex-col items-center justify-center gap-10 border-[1px] border-slate-300 rounded-md shadow-lg">
        {/* <h1>Welcome to SmartAttendee</h1> */}
        <h1 className="text-[30px] text-center font-semibold">
          {"Let's simplify time management"}
        </h1>
        <form
          className="w-full h-full flex flex-col items-center justify-center gap-5"
          action={handleSubmit}
        >
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <label className="text-sm">Organization Name</label>
            <input
              className="w-full px-2 py-[5px] border-[1px] text-sm border-slate-300 outline-[1px] outline-slate-500 rounded-sm"
              type="text"
              name="organizationName"
              required
            />
          </div>

          <div className="w-full flex flex-col items-start justify-center gap-2">
            <label className="text-sm">Country</label>
            <input
              className="w-full px-2 py-[5px] border-[1px] text-sm border-slate-300 outline-[1px] outline-slate-500 rounded-sm"
              type="text"
              name="country"
              required
            />
          </div>

          <div className="w-full flex flex-col items-start justify-center gap-2">
            <label className="text-sm">Email</label>
            <input
              className="w-full px-2 py-[5px] border-[1px] text-sm border-slate-300 outline-[1px] outline-slate-500 rounded-sm"
              type="email"
              name="email"
              required
            />
          </div>

          <div className="w-full flex flex-col items-start justify-center gap-2">
            <label className="text-sm">Industry</label>
            <input
              className="w-full px-2 py-[5px] border-[1px] text-sm border-slate-300 outline-[1px] outline-slate-500 rounded-sm"
              type="text"
              name="industry"
              required
            />
          </div>

          <div className="w-full flex flex-col items-start justify-center gap-2">
            <label className="text-sm">Size</label>
            <input
              className="w-full px-2 py-[5px] border-[1px] text-sm border-slate-300 outline-[1px] outline-slate-500 rounded-sm"
              type="text"
              name="size"
              required
            />
          </div>
          {error && <p className="text-red-600">Error: {error}</p>}
          <button
            className="w-full py-[6px] text-sm bg-slate-500 text-white rounded-sm shadow-md"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
