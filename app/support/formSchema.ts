import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(2, { message: "Imię jest wymagane" }),
  lastName: z.string().min(1, { message: "Nazwisko jest wymagane" }),
  email: z
    .string()
    .email({ message: "Nieprawidłowy adres e-mail" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message:
        "Adres e-mail musi być w poprawnym formacie (np. user@example.com)",
    }),
  phoneNumber: z.string().regex(/^\d{9}$/, {
    message: "Numer telefonu musi być w formacie 123456789",
  }), // Format dla Polski
  message: z.string().min(1, { message: "Wiadomość jest wymagana" }),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "Musisz zaakceptować politykę prywatności",
  }),
});
