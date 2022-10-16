import express from "express";
import CustomerController from ".././controllers/customer.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new CustomerController();
  const response = await controller.getCustomers();
  return res.send(response);
});
export default router;
