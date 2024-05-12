import { addUser, loginUser } from '../controllers/user';
import { loginRouteValidator, registerRouteValidator } from '../validators/user';

import express from 'express';

const router = express.Router();

router.post('/addUser', registerRouteValidator, addUser);
router.post('/login', loginRouteValidator, loginUser);

export default router;
