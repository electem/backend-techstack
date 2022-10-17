import express from "express";
import CustomerGroupController from ".././controllers/customerGroup.controller";

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
export default router;
