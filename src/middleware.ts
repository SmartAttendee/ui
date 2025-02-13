import {
  clerkMiddleware,
  createRouteMatcher,
  clerkClient,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/forgot-password",
]);
const isOnboardingRoute = createRouteMatcher(["/onboarding"]);
const isPrivateRoute = createRouteMatcher(["/dashboard"]);
const isAdminRoute = createRouteMatcher(["/admin"]);

const BASE_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  const currentUser = userId
    ? await (await clerkClient()).users.getUser(userId)
    : null;

  // If the user is signed in and accessing public route
  if (userId && isPublicRoute(req)) {
    console.log("public route");
    return NextResponse.redirect(`${BASE_URL}/dashboard`);
  }

  // If the user isn't signed in and accessing private route,
  // redirect to sign-in
  if (!userId && (isPrivateRoute(req) || isOnboardingRoute(req))) {
    console.log("private route");
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // For users visiting /onboarding, don't try to redirect
  if (userId && isOnboardingRoute(req)) {
    console.log("in onboarding route");
    if (sessionClaims?.metadata?.onboardingComplete) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  }

  // Catch users who do not have `onboardingComplete: true` in their publicMetadata
  // Redirect them to the /onboading route to complete onboarding
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    console.log("onboarding route");
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // Restrict admin routes to users with specific permissions
  if (isAdminRoute(req) && currentUser?.publicMetadata?.role !== "Admin") {
    return NextResponse.redirect(`${BASE_URL}/dashboard`);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
