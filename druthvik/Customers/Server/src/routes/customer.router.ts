import express from 'express';
import customerController from '../controller/customer.controller';

const router = express.Router();
router.post('/', async (req, res) => {
  const controller = new customerController();
  const response = await controller.createCustomer(req.body);
  return res.send(response);
});

router.get('/', async (_req, res) => {
  const controller = new customerController();
  const response = await controller.getCustomers();
  return res.send(response);
});
export default router;
