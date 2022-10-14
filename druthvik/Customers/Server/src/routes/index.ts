import express from 'express';
const router = express.Router();
import registerRouter from './userreister.router';
import customerRouter from './customer.router';

router.use('/registeruser', registerRouter);
router.use('/customers', customerRouter);

export default router;
