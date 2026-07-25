"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get("/", auth_1.authenticate, order_controller_1.getOrders);
router.post("/", auth_1.authenticate, order_controller_1.createOrder);
router.put("/:id/status", auth_1.authenticate, order_controller_1.updateOrderStatus);
exports.default = router;
