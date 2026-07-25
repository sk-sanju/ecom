"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOffer = exports.updateOffer = exports.createOffer = exports.getAllOffers = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getAllOffers = async (req, res) => {
    try {
        const offers = await prisma_1.default.offerCard.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(offers);
    }
    catch (error) {
        console.error('Error fetching offers:', error);
        res.status(500).json({ message: 'Error fetching offers' });
    }
};
exports.getAllOffers = getAllOffers;
const createOffer = async (req, res) => {
    try {
        const { title, images, link } = req.body;
        if (!title || !images) {
            return res.status(400).json({ message: 'Title and images are required' });
        }
        const newOffer = await prisma_1.default.offerCard.create({
            data: {
                title,
                images,
                link: link || '/shop'
            }
        });
        res.status(201).json(newOffer);
    }
    catch (error) {
        console.error('Error creating offer:', error);
        res.status(500).json({ message: 'Error creating offer' });
    }
};
exports.createOffer = createOffer;
const updateOffer = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, images, link } = req.body;
        const offer = await prisma_1.default.offerCard.update({
            where: { id },
            data: { title, images, link }
        });
        res.json(offer);
    }
    catch (error) {
        console.error('Error updating offer:', error);
        res.status(500).json({ message: 'Error updating offer' });
    }
};
exports.updateOffer = updateOffer;
const deleteOffer = async (req, res) => {
    try {
        const id = req.params.id;
        await prisma_1.default.offerCard.delete({
            where: { id }
        });
        res.json({ message: 'Offer deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting offer:', error);
        res.status(500).json({ message: 'Error deleting offer' });
    }
};
exports.deleteOffer = deleteOffer;
