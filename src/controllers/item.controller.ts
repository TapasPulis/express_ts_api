import { Request, Response, NextFunction } from "express";
import {
  getItemsByOrderService,
  addItemToOrderService,
} from "../services/item.service";

export const getItemsByOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const items = await getItemsByOrderService();
    if (!items) {
      return res.status(400).json({ status: "No items found..." });
    }
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

export const addItemToOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const item = await addItemToOrderService(data);
    if (!item) {
      return res.status(400).json({ status: "Failed to add item to order..." });
    }
    res.status(200).json({ status: "Item added to order successfully" });
  } catch (error) {
    next(error);
  }
};
