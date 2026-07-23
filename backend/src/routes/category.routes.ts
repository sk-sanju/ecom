import express from "express";
import { getCategories, createCategory } from "../controllers/category.controller";
import { authenticate, requireAdmin } from "../middlewares/auth";

const router = express.Router();

router.get("/", getCategories);
router.post("/", authenticate, requireAdmin, createCategory);

export default router;
