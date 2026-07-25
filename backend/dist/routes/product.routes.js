"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get("/", product_controller_1.getProducts);
router.get("/:id", product_controller_1.getProductById);
router.post("/", auth_1.authenticate, auth_1.requireAdmin, product_controller_1.createProduct);
router.put("/:id", auth_1.authenticate, auth_1.requireAdmin, product_controller_1.updateProduct);
router.delete("/:id", auth_1.authenticate, auth_1.requireAdmin, product_controller_1.deleteProduct);
exports.default = router;
