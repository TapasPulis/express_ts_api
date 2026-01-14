import { Request, Response } from "express";

export const getAllProducts = (req: Request, res: Response) => {
  const products = [
    { id: 1, name: "Book", price: 9.99 },
    { id: 2, name: "Pen", price: 1.99 },
  ];

  res.status(200).json(products);
};

export const createProduct = (req: Request, res: Response) => {
  const { name, price } = req.body;

  res.status(201).json({
    message: "Product Created",
    data: { name, price },
  });
};

export const getProductById = (req: Request, res: Response) => {
  const productId = req.params.id;
  res.json({ id: productId });
};
