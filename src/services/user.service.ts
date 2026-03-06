import bcrypt from "bcrypt";
import { prisma } from "../config/db";
import { AppError } from "../utils/app.error";
import { CreateUserTypeZ } from "../models/user.model";
import id from "zod/v4/locales/id.js";

export const getAllUsersService = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
    },
  });

  return users;
};

export const createUserService = async (data: CreateUserTypeZ) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new AppError("User with that email already exists", 409);
  }

  // encrypt the password
  const hashedPassword = await bcrypt.hash(data.password, 12);

  return prisma.user.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: hashedPassword,
    },
  });
};

export const getUserByIdService = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  return user;
};

export const updateUserByIdService = async (
  id: number,
  data: CreateUserTypeZ,
) => {
  const hashedPassword = await bcrypt.hash(data.password, 12);
  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: hashedPassword,
    },
  });
  return updatedUser;
};

export const deleteUserByIdService = async (id: number) => {
  const deletedUser = await prisma.user.delete({
    where: { id: id },
  });
  return deletedUser;
};
