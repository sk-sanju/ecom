"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getProducts = async (req, res) => {
    try {
        const products = await prisma_1.default.product.findMany({
            include: { category: true }
        });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching products" });
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await prisma_1.default.product.findUnique({
            where: { id },
            include: { category: true }
        });
        if (!product)
            return res.status(404).json({ error: "Product not found" });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching product" });
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        const { name, description, price, discountPrice, sku, stockQuantity, images, categoryId, tags, sizes } = req.body;
        const product = await prisma_1.default.product.create({
            data: {
                name,
                description,
                price,
                discountPrice,
                sku,
                stockQuantity,
                images: images || [],
                categoryId,
                tags: tags || [],
                sizes: sizes || []
            }
        });
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating product" });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, price, discountPrice, sku, stockQuantity, images, categoryId, tags, sizes } = req.body;
        const product = await prisma_1.default.product.update({
            where: { id },
            data: {
                name,
                description,
                price,
                discountPrice,
                sku,
                stockQuantity,
                images,
                categoryId,
                tags,
                sizes
            }
        });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating product" });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await prisma_1.default.product.delete({
            where: { id }
        });
        res.json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting product" });
    }
};
exports.deleteProduct = deleteProduct;
