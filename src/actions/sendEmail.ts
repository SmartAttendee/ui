"use server";

import sendEmail from "@/lib/sendInviteEmail";

export const sendMail = async (email: string) => {
  await sendEmail(email);
};
