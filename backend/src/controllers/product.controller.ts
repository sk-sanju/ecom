import { Request, Response } from "express";
import prisma from "../prisma";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, discountPrice, sku, stockQuantity, images, categoryId, tags, sizes } = req.body;
    
    const product = await prisma.product.create({
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
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { name, description, price, discountPrice, sku, stockQuantity, images, categoryId, tags, sizes } = req.body;
    
    const product = await prisma.product.update({
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
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await prisma.product.delete({
      where: { id }
    });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};
