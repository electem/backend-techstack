import express from 'express';
import PanelRouter from '../routes/panel.router';
import TestRouter from '../routes/test.router';
import ReportRouter from '../routes/report.router';

const router = express.Router();

router.use('/panel', PanelRouter);
router.use('/test', TestRouter);
router.use('/report', ReportRouter);

export default router;
