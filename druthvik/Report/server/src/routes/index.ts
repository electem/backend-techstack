import express from 'express';
import PanelRouter from '../routes/panel.router';
import TestRouter from '../routes/test.router';

const router = express.Router();

router.use('/panel', PanelRouter);
router.use('/test', TestRouter);

export default router;
