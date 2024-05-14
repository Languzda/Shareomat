import express from 'express';
import { addOffer, getActiveOffers, getOfferById, getOffersByCardId, useOffer } from '../controllers/offer';
import {
  addOfferRouteValidator,
  getOfferByCardIdRouteValidator,
  getOfferByIdRouteValidator,
} from '../validators/offer';

const router = express.Router();

router.post('/addOffer', addOfferRouteValidator, addOffer);

router.get('/getActiveOffers', getActiveOffers);
// get offers from a specific card
router.get('/getCardOffers', getOfferByCardIdRouteValidator, getOffersByCardId);
// get offer by id
router.get('/getOfferById/:offer_id', getOfferByIdRouteValidator, getOfferById);

router.put('/useOfferById/:offer_id', getOfferByIdRouteValidator, useOffer);

export default router;
