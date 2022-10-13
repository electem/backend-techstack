import express from 'express';
const router = express.Router();
import registerRouter from './userregister.router';

router.use('/registeruser', registerRouter);

export default router;
