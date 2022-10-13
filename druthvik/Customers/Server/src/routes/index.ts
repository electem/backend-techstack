import express from 'express';
const router = express.Router();
import registerRouter from './userreister.router';

router.use('/registeruser', registerRouter);

export default router;
