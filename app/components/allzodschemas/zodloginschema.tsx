import { z } from "zod";
export const loginschema = z.object({
  userMobile: z.number().min(10).max(10,"enter proper 10 digit number"),
  password: z.string().min(8,"password should be at least 8 characters").max(22,"password should be less than 22 characters"),
});
