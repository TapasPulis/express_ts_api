import mongoose from "mongoose";

export interface UserDocument {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, max: 122, min: 0, required: true },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
