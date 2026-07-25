"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getCategories = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getCategories = async (req, res) => {
    try {
        const categories = await prisma_1.default.category.findMany({
            include: {
                _count: {
                    select: { products: true }
                }
            }
        });
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching categories" });
    }
};
exports.getCategories = getCategories;
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await prisma_1.default.category.create({
            data: { name }
        });
        res.status(201).json(category);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating category" });
    }
};
exports.createCategory = createCategory;
