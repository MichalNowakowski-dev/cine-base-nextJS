import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.BASE_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Potwierdź swój adres e-mail",
    html: `<p>Kliknij <a href="${confirmLink}">TUTAJ</a> aby potwierdzić e-mail.</p>`,
  });
};
