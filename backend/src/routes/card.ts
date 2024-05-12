import express from 'express';
import { addCard, getUserCards } from '../controllers/card';
import { addCardRouteValidator, getCardsRouteValidator } from '../validators/card';

const router = express.Router();

router.post('/addCard', addCardRouteValidator, addCard);
// get cards for a single user
router.get('/getUserCards', getCardsRouteValidator, getUserCards);

export default router;
