import express from 'express';
import { addCard, getUserCards } from '../controllers/card';

const router = express.Router();

router.post('/addCard', addCard);
// get cards for a single user
router.get('/getUserCards', getUserCards);

export default router;
