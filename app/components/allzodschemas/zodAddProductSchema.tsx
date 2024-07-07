import { z } from "zod";

export const addProductSchema = z.object({
  productName: z.string().min(3).max(50),
  price: z.number().positive(),
  MRP: z.number().positive(),
  description: z.string().min(10).max(200),
  images: z.array(z.object({
    public_id: z.string(),
    url: z.string().url(),
  })),
  adminId: z.number().min(1),
});
