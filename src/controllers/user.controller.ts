import type { Request, Response } from "express";
export const getUsers = (req: Request, res: Response) => {
  const users = [
    { id: 1, name: "Alice", job: "Engineer" },
    { id: 2, name: "Bob", job: "Designer" },
  ];
  res.status(200).json(users);
};
