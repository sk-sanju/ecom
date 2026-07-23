import express from 'express';
import { getAllOffers, createOffer, updateOffer, deleteOffer } from '../controllers/offer.controller';
import { authenticate, requireAdmin } from '../middlewares/auth';

const router = express.Router();

router.get('/', getAllOffers);
router.post('/', authenticate, requireAdmin, createOffer);
router.put('/:id', authenticate, requireAdmin, updateOffer);
router.delete('/:id', authenticate, requireAdmin, deleteOffer);

export default router;
