import mongoose from "mongoose";
import { z } from "zod";

export interface UserDocument {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const createUserValidation = z.object({
  body: z.object({
    name: z.string("Please enter a valid name").min(2),
    email: z.email("Please enter a valid email"),
    age: z.number("Please enter a valid age").min(0),
  }),
});

export type CreateUserTypeZ = z.infer<typeof createUserValidation>["body"];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
