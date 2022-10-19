import express from 'express';
import TestController from '../controllers/test.controller';

const router = express.Router();

router.get('/', async (_req, res) => {
  const controller = new TestController();
  const response = await controller.getTests();
  return res.send(response);
});

export default router;
