import express from 'express';

import { signup } from '../controllers/';
import { authorize } from '../middlewares/';

const router = express.Router();

router.get('/signup/', authorize, signup);

export default router;
