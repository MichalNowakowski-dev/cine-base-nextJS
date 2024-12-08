import { z } from "zod";

const nameSchema = z.object({
  firstName: z.string().min(2, { message: "Imię jest wymagane" }),
  lastName: z.string().min(2, { message: "Nazwisko jest wymagane" }),
});

export default nameSchema;
