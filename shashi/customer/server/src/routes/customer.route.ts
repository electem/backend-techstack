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
router.get("/:id", async (req, res) => {
  const controller = new CustomerController();
  const response = await controller.getCustomerById(req.params.id);
  if (!response) res.status(404).send({ message: "No customers found" });
  return res.send(response);
});

router.put("/", async (req, res) => {
  const controller = new CustomerController();
  const response = await controller.updateCustomer(req.body);
  return res.send(response);
});
export default router;
