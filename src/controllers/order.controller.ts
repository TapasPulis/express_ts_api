import { Request, Response, NextFunction } from "express";
import {
  getAllOrdersService,
  getOrderByIdService,
  createOrderService,
  updateOrderByIdService,
  deleteOrderByIdService,
} from "../services/order.service";

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orders = await getAllOrdersService();
    if (!orders) {
      return res.status(400).json({ status: "No orders found..." });
    }
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const order = await getOrderByIdService(id);
    if (!order) {
      return res.status(404).json({ status: "No order found..." });
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const order = await createOrderService(data);
    if (!order) {
      return res.status(400).json({ status: "Failed to create order..." });
    }
    res.status(200).json({ status: "Order created successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const data = req.body;
    const order = await updateOrderByIdService(id, data);
    if (!order) {
      return res.status(400).json({ status: "Failed to update order..." });
    }
    res.status(200).json({ status: "Order updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const order = await deleteOrderByIdService(id);
    if (!order) {
      return res.status(400).json({ status: "Failed to delete order..." });
    }
    res.status(200).json({ status: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};
