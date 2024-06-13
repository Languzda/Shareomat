import express from 'express';
import {
  addOffer,
  addOfferWithPhoto,
  deleteAllOfferOlderThen,
  getActiveOffers,
  getOfferById,
  getOffersByCardId,
  useOffer,
} from '../controllers/offer';
import {
  addOfferRouteValidator,
  getOfferByCardIdRouteValidator,
  getOfferByIdRouteValidator,
  useOfferByIdRouteValidator,
} from '../validators/offer';
import { isAuth } from '../middlewares/isAuth';

const router = express.Router();

router.post('/addOffer', isAuth, addOfferRouteValidator, addOffer);
router.post('/addOfferWithPhoto', isAuth, addOfferRouteValidator, addOfferWithPhoto);

router.get('/getActiveOffers', isAuth, getActiveOffers);
// get offers from a specific card
router.get('/getCardOffers', isAuth, getOfferByCardIdRouteValidator, getOffersByCardId);
// get offer by id
router.get('/getOfferById/:offer_id', isAuth, getOfferByIdRouteValidator, getOfferById);

router.put('/useOfferById/:offer_id', isAuth, useOfferByIdRouteValidator, useOffer);

router.delete('/admin11/delete', deleteAllOfferOlderThen);

export default router;
