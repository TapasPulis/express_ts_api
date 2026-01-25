import { z } from "zod";

export const createProductValidation = z.object({
  body: z.object({
    name: z.string().min(3),
    price: z.number().min(0),
  }),
});

export type CreateProductTypeZ = z.infer<
  typeof createProductValidation
>["body"];
