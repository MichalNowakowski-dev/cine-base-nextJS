import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Hasło musi mieć co najmniej 8 znaków.")
      .regex(/[A-Z]/, "Hasło musi zawierać co najmniej jedną wielką literę.")
      .regex(/[a-z]/, "Hasło musi zawierać co najmniej jedną małą literę.")
      .regex(/[0-9]/, "Hasło musi zawierać co najmniej jedną cyfrę.")
      .regex(
        /[^a-zA-Z0-9]/,
        "Hasło musi zawierać co najmniej jeden znak specjalny."
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła muszą być identyczne.",
    path: ["confirmPassword"], // Wskazuje pole `confirmPassword` jako źródło błędu
  });
