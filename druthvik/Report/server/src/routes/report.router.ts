import express from 'express';
import ReportController from '../controllers/report.controller';

const router = express.Router();

router.post('/', async (req, res) => {
  const controller = new ReportController();
  const response = await controller.createReport(req.body);
  return res.send(response);
});

export default router;
