import { z } from "zod";

const resetPasswordEmailSchema = z.object({
  email: z.string().email("Podaj poprawny adres e-mail"),
});

export default resetPasswordEmailSchema;
