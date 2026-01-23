import { UserDocument, UserModel } from "../models/user.model";

export interface Users {
  name: string;
  email: string;
  age: number;
  id: string;
}

export const createUser = async (name: string, email: string, age: number) => {
  const newUser: UserDocument = {
    name,
    email,
    age,
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const createdUser = await UserModel.create(newUser);
  return createdUser;
};

export const getAllUsers = async () => {
  const users = await UserModel.find();

  if (users.length === 0) {
    throw new Error("No users found");
  }
  return users;
};

export const getUserById = async (id: string) => {
  const getUserId = await UserModel.findById(id);
  return getUserId;
};

//
export const updateById = async (
  id: string,
  updateData: Partial<UserDocument>,
) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  return updatedUser;
};

export const deleteById = async (id: string) => {
  return await UserModel.findByIdAndDelete(id);
};
