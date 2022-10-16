import express from "express";
import CustomerController from ".././controllers/customer.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new CustomerController();
  const response = await controller.getCustomers();
  return res.send(response);
});
router.post("/", async (req, res) => {
  const controller = new CustomerController();
  const response = await controller.createCustomer(req.body);
  return res.send(response);
});
export default router;
