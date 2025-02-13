"use client";

import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const username = searchParams.get("username");

  return (
    <div className="w-full h-full py-20 flex items-center justify-center">
      <SignUp
        initialValues={{ emailAddress: email || "", username: username || "" }}
        unsafeMetadata={
          email && username ? { role: "Employee", byPassOnboarding: true } : {}
        }
      />
    </div>
  );
}
