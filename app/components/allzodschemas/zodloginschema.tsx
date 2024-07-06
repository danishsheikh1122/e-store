import { z } from "zod";

export const loginschema = z.object({
  userNumber: z.string().min(10, { message: "Enter a proper 10-digit number" }).max(10, { message: "Enter a proper 10-digit number" }),//defining number as string to validate it properly
  password: z.string().min(8, { message: "Password should be at least 8 characters" }).max(22, { message: "Password should be less than 22 characters" }),
});
