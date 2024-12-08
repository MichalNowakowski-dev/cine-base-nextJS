import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Hasło musi mieć co najmniej 8 znaków")
  .max(64, "Hasło nie może mieć więcej niż 64 znaki")
  .regex(/[A-Z]/, "Hasło musi zawierać co najmniej jedną wielką literę")
  .regex(/[a-z]/, "Hasło musi zawierać co najmniej jedną małą literę")
  .regex(/[0-9]/, "Hasło musi zawierać co najmniej jedną cyfrę")
  .regex(
    /[@$!%*?&]/,
    "Hasło musi zawierać co najmniej jeden znak specjalny (@, $, !, %, *, ?, &)"
  );

export default passwordSchema;
