import express from 'express';
const router = express.Router();
import registerRouter from './userreister.router';
import customerRouter from './customer.router';
import customerGroupRouter from './customergroup.router';

router.use('/registeruser', registerRouter);
router.use('/customers', customerRouter);
router.use('/customergroup', customerGroupRouter);

export default router;
