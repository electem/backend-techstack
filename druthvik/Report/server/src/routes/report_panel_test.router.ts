import express from 'express';
import ReportPanelTestController from '../controllers/report_panel_test.controller';

const router = express.Router();

router.get('/', async (req, res) => {
  const controller = new ReportPanelTestController();
  const response = await controller.getReportpaneltest();
  return res.send(response);
});

export default router;
