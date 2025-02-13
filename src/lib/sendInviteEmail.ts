import axios from "axios";

// inviteId
// orgName
// username
// email
// expiresAt

type sendEmailArgs = {
  email: string;
  emailType: string;
  token: string;
  username?: string;
};

const createEmailHtml = (
  emailType: string,
  token: string,
  domain: string,
  username?: string
) => {
  const subject =
    emailType === "VERIFY-EMAIL"
      ? "Verify your email"
      : emailType === "RESET-PASSWORD"
      ? "Reset your password"
      : "Reminder to verify your email";

  // Define the HTML content for different email types
  const verifyEmailHtml = `
  <html>
    <body>
      <h1 style="font-size: 24px;">${subject}</h1>
      <p style="font-size: 16px;">To continue setting up your Jobgregate account, please verify that this is your email address.</p>
      <br/>
      <a href="${domain}/verify-email?token=${token}" style="padding: 12px 18px; color: #fff; background-color: #10a37f; border-radius: 4px; font-size: 16px; text-decoration: none;">Verify email address</a>
      <br/>
      <br/>
      <p style="font-size: 12px;">This link will expire after 2 days. If you did not make this request, please disregard this email.</p>
    </body>
  </html>`;

  const forgotPasswordEmailHtml = `
  <html>
    <body>
      <h1 style="font-size: 24px;">${subject}</h1>
      <p style="font-size: 16px;">A password change has been requested for your account. If this was you, please use the link below to reset your password.</p>
      <br/>
      <a href="${domain}/reset-password?token=${token}" style="padding: 12px 18px; color: #fff; background-color: #10a37f; border-radius: 4px; font-size: 16px; text-decoration: none;">Reset password</a>
      <br/>
      <br/>
      <p style="font-size: 12px;">This link will expire in 1 hour. If you did not make this request, please disregard this email.</p>
    </body>
  </html>`;

  const verificationReminderEmailHtml = `
  <html>
    <body>
      <h1 style="font-size: 24px;">Verification Reminder</h1>
      <p style="font-size: 16px;">Hi ${username || "there"},</p>
      <p style="font-size: 16px;">This is a reminder to verify your email address so you can fully access your Jobgregate account.</p>
      <br/>
      <a href="${domain}/verify-email?token=${token}" style="padding: 12px 18px; color: #fff; background-color: #10a37f; border-radius: 4px; font-size: 16px; text-decoration: none;">Verify your email</a>
      <br/>
      <br/>
      <p style="font-size: 12px;">Please verify your email within the next 2 days. If you did not make this request, please disregard this email.</p>
    </body>
  </html>`;

  if (emailType === "VERIFY-EMAIL") return verifyEmailHtml;
  if (emailType === "RESET-PASSWORD") return forgotPasswordEmailHtml;
  if (emailType === "VERIFICATION-REMINDER")
    return verificationReminderEmailHtml;

  return "";
};

const sendEmail = async (email: string) => {
  const apiKey = process.env.BREVO_API_KEY;
  // const domain = process.env.NEXT_PUBLIC_URL;

  const subject = "Invitation email";

  // const emailHtml = createEmailHtml(
  //   emailType,
  //   token,
  //   domain as string,
  //   username
  // );

  const payload = {
    sender: { email: "smartattendee100@gmail.com", name: "SmartAttendee" },
    to: [{ email }],
    subject,
    htmlContent: `<html><body><p>Join my organization.</p></body></html>`,
  };

  try {
    console.log(`sending email to ${email}`);
    await axios.post("https://api.sendinblue.com/v3/smtp/email", payload, {
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
    });
    console.log("email sent");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
