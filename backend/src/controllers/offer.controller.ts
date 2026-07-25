import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAllOffers = async (req: Request, res: Response) => {
  try {
    const offers = await prisma.offerCard.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(offers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ message: 'Error fetching offers' });
  }
};

export const createOffer = async (req: Request, res: Response) => {
  try {
    const { title, images, link } = req.body;
    
    if (!title || !images) {
      return res.status(400).json({ message: 'Title and images are required' });
    }

    const newOffer = await prisma.offerCard.create({
      data: {
        title,
        images,
        link: link || '/shop'
      }
    });
    
    res.status(201).json(newOffer);
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json({ message: 'Error creating offer' });
  }
};

export const updateOffer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { title, images, link } = req.body;

    const offer = await prisma.offerCard.update({
      where: { id },
      data: { title, images, link }
    });

    res.json(offer);
  } catch (error) {
    console.error('Error updating offer:', error);
    res.status(500).json({ message: 'Error updating offer' });
  }
};

export const deleteOffer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    await prisma.offerCard.delete({
      where: { id }
    });

    res.json({ message: 'Offer deleted successfully' });
  } catch (error) {
    console.error('Error deleting offer:', error);
    res.status(500).json({ message: 'Error deleting offer' });
  }
};
