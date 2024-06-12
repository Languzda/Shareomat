import express from 'express';
import { addCard, getUserCards } from '../controllers/card';
import { addCardRouteValidator } from '../validators/card';
import { isAuth } from '../middlewares/isAuth';

const router = express.Router();

router.post('/addCard', isAuth, addCardRouteValidator, addCard);
// get cards for a single user
router.get('/getUserCards/:user_id', isAuth, getUserCards);

export default router;
