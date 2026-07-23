import express from "express";
import { getOrders, createOrder, updateOrderStatus } from "../controllers/order.controller";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.get("/", authenticate, getOrders);
router.post("/", authenticate, createOrder);
router.put("/:id/status", authenticate, updateOrderStatus);

export default router;
