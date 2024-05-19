import express from 'express';
import { addOffer, getActiveOffers, getOfferById, getOffersByCardId, useOffer } from '../controllers/offer';
import {
  addOfferRouteValidator,
  getOfferByCardIdRouteValidator,
  getOfferByIdRouteValidator,
} from '../validators/offer';
import { isAuth } from '../middlewares/isAuth';

const router = express.Router();

router.post('/addOffer', isAuth, addOfferRouteValidator, addOffer);

router.get('/getActiveOffers', isAuth, getActiveOffers);
// get offers from a specific card
router.get('/getCardOffers', isAuth, getOfferByCardIdRouteValidator, getOffersByCardId);
// get offer by id
router.get('/getOfferById/:offer_id', isAuth, getOfferByIdRouteValidator, getOfferById);

router.put('/useOfferById/:offer_id', isAuth, getOfferByIdRouteValidator, useOffer);

export default router;
