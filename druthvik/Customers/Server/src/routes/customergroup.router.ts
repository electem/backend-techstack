import express from 'express';
import CustomerGroupController from '../controller/customergroup.controller';

const router = express.Router();
router.get('/', async (_req, res) => {
  const controller = new CustomerGroupController();
  const response = await controller.getCustomerGroup();
  return res.send(response);
});

export default router;
