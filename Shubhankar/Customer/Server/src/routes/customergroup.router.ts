import express from "express";
import CustomerGroupController from "../controllers/customergroup.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new CustomerGroupController();
  const response = await controller.getCustomerGroups();
  return res.send(response);
});
router.post("/", async (req, res) => {
  const controller = new CustomerGroupController();
  const response = await controller.createCustomerGroup(req.body);
  return res.send(response);
});
router.put("/", async (req, res) => {
  const controller = new CustomerGroupController();
  const response = await controller.updateCustomerGroup(req.body);
  return res.send(response);
});
router.get("/:id", async (req, res) => {
  const controller = new CustomerGroupController();
  const response = await controller.getCustomerGroup(req.params.id);
  if (!response) res.status(404).send({message: "No post found"})
  return res.send(response);
});

router.delete('/:id', async (req, res) => {
  const controller = new CustomerGroupController();
  const response = await controller.deleteCustomergroupById(req.params.id);
  if (!response) res.status(404).send({ message: 'No user found' });
  return res.send(response);
});
export default router