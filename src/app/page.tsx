// import {
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
//   SignIn,
//   SignUp,
// } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          padding: "20px",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        SmartAttendee
      </h1>
      <p style={{ textAlign: "center" }}>
        {
          "A web app for tracking employees' attendance, leave and task management."
        }
      </p>

      {/* <SignedOut>
        <SignIn />
        <SignUp />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn> */}
    </div>
  );
}
