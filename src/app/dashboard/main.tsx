"use client";

import { useAuth } from "@clerk/nextjs";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Main() {
  const { isLoaded, userId, sessionId } = useAuth();
  const { user } = useUser();

  // store user to database for first time users
  useEffect(() => {
    if (userId) {
      const storeUserToDb = async (): Promise<void> => {
        try {
          const userObject = {
            clerkId: user?.id,
            username: user?.username,
            email: user?.primaryEmailAddress?.emailAddress,
            phoneNumber: user?.primaryPhoneNumber?.phoneNumber,
            avatar: user?.imageUrl,
            organizationName: user?.publicMetadata.organizationName,
            role: user?.publicMetadata.role,
          };

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/auth/add-user-to-db`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userObject),
              cache: "no-store",
            }
          );

          const data = await response.json();

          if (!response.ok) {
            console.error("Failed to store user:", data);
            return;
          }

          console.log("User stored successfully:", data);
        } catch (error) {
          console.error("Error storing user to db:", error);
        }
      };

      storeUserToDb();
    }
  }, [
    userId,
    user?.id,
    user?.username,
    user?.primaryEmailAddress?.emailAddress,
    user?.primaryPhoneNumber?.phoneNumber,
    user?.imageUrl,
    user?.publicMetadata.organizationName,
    user?.publicMetadata.role,
  ]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Hello, {userId}! Your current active session is {sessionId}.
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
