import express from 'express';
import PanelRouter from '../routes/panel.router';
import TestRouter from '../routes/test.router';
import ReportRouter from '../routes/report.router';
import ReportPanelTestRouter from '../routes/report_panel_test.router';

const router = express.Router();

router.use('/panel', PanelRouter);
router.use('/test', TestRouter);
router.use('/report', ReportRouter);
router.use('/reportpaneltest', ReportPanelTestRouter);

export default router;
