import { Request, Response } from "express";
import prisma from "../prisma";
import { AuthRequest } from "../middlewares/auth";
import { sendOrderConfirmationEmail, sendOrderStatusUpdateEmail } from "../utils/mailer";

export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const { all } = req.query;
    const whereClause = (req.user?.role === "ADMIN" && all === 'true') 
      ? {} 
      : { userId: req.user?.id };

    const orders = await prisma.order.findMany({
      where: whereClause,
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { totalAmount, paymentMethod } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        paymentMethod,
        status: "PENDING",
      },
      include: { user: true }
    });
    
    // Send email notification
    await sendOrderConfirmationEmail(order.user, order);
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Error creating order" });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const id = req.params.id as string;
    const { status } = req.body;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
      include: { user: true }
    });

    // Send email notification about status update
    await sendOrderStatusUpdateEmail(updatedOrder.user, updatedOrder);

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Error updating order status" });
  }
};
