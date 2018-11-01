import express from 'express';

import { signup, me } from '../controllers/';
import { authorize } from '../middlewares/';

const router = express.Router();

router.post('/signup', signup);

router.get('/me', authorize, me);

export default router;
