"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.createOrder = exports.getOrders = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const mailer_1 = require("../utils/mailer");
const getOrders = async (req, res) => {
    try {
        const { all } = req.query;
        const whereClause = (req.user?.role === "ADMIN" && all === 'true')
            ? {}
            : { userId: req.user?.id };
        const orders = await prisma_1.default.order.findMany({
            where: whereClause,
            include: { user: { select: { id: true, name: true, email: true } } },
            orderBy: { createdAt: "desc" },
        });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching orders" });
    }
};
exports.getOrders = getOrders;
const createOrder = async (req, res) => {
    try {
        const { totalAmount, paymentMethod } = req.body;
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const order = await prisma_1.default.order.create({
            data: {
                userId,
                totalAmount,
                paymentMethod,
                status: "PENDING",
            },
            include: { user: true }
        });
        // Send email notification
        await (0, mailer_1.sendOrderConfirmationEmail)(order.user, order);
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating order" });
    }
};
exports.createOrder = createOrder;
const updateOrderStatus = async (req, res) => {
    try {
        if (req.user?.role !== "ADMIN") {
            return res.status(403).json({ error: "Forbidden" });
        }
        const id = req.params.id;
        const { status } = req.body;
        const updatedOrder = await prisma_1.default.order.update({
            where: { id },
            data: { status },
            include: { user: true }
        });
        // Send email notification about status update
        await (0, mailer_1.sendOrderStatusUpdateEmail)(updatedOrder.user, updatedOrder);
        res.json(updatedOrder);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating order status" });
    }
};
exports.updateOrderStatus = updateOrderStatus;
