import { z } from "zod";

export interface USER {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export const createUserValidation = z.object({
  body: z.object({
    name: z.string("Please enter a valid name").min(2),
    email: z.email("Please enter a valid email"),
  }),
});

export type CreateUserTypeZ = z.infer<typeof createUserValidation>["body"];
