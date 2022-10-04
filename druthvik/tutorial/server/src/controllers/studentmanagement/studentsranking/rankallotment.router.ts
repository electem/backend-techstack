import express from 'express';
import { RankAllotmentController } from '../studentsranking/rank.allotment.controller';
const router = express.Router();

//returns all the students without average marks
router.get('/allstudents', async (req, res) => {
  const controller = new RankAllotmentController();
  const response = await controller.getAllStudents();
  if (!response) res.status(404).send({ message: 'Average Not Calculated' });
  return res.send(response);
});

// returns sudents with average marks
router.get('/average', async (req, res) => {
  const controller = new RankAllotmentController();
  const response = await controller.getCalculatedAverge();
  if (!response) res.status(404).send({ message: 'Average Not Calculated' });
  return res.send(response);
});

export default router;
