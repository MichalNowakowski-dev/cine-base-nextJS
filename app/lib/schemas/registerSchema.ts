import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().min(2, { message: "Imię jest wymagane" }),
  lastName: z.string().min(2, { message: "Nazwisko jest wymagane" }),
  email: z
    .string()
    .email({ message: "Nieprawidłowy adres e-mail" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message:
        "Adres e-mail musi być w poprawnym formacie (np. user@example.com)",
    }),
  password: z
    .string()
    .min(8, "Hasło musi mieć co najmniej 8 znaków")
    .max(64, "Hasło nie może mieć więcej niż 64 znaki")
    .regex(/[A-Z]/, "Hasło musi zawierać co najmniej jedną wielką literę")
    .regex(/[a-z]/, "Hasło musi zawierać co najmniej jedną małą literę")
    .regex(/[0-9]/, "Hasło musi zawierać co najmniej jedną cyfrę")
    .regex(
      /[@$!%*?&]/,
      "Hasło musi zawierać co najmniej jeden znak specjalny (@, $, !, %, *, ?, &)"
    ),
});

export default registerSchema;
