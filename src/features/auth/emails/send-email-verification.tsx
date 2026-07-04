import EmailVerification from "@/emails/auth/email-verification";
import { resend } from "@/lib/resend";

export const sendEmailVerification = async (
  username: string,
  email: string,
  veridicationCode: string,
) => {
  return await resend.emails.send({
    from: "no-reply@app.road-to-nest-app.com",
    to: email,
    subject: "Email verification from TicketBounty",
    react: <EmailVerification toName={username} code={veridicationCode} />,
  });
};
