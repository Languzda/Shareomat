import express from 'express';
import { addOffer, getActiveOffers, getOfferById, getOffersByCardId } from '../controllers/offer';

const router = express.Router();

router.post('/addOffer', addOffer);

router.get('/getActiveOffers', getActiveOffers);
// get offers from a specific card
router.get('/getCardOffers', getOffersByCardId);
// get offer by id
router.get('/getOfferById', getOfferById);

export default router;
