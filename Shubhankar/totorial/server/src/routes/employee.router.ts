import express from "express";
import EmployeeController from '../controllers/employee.controller';

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new EmployeeController();
  const response = await controller.getEmployee();
  return res.send(response);
});
router.post("/", async (req, res) => {
  const controller = new EmployeeController();
  const response = await controller.createEmployee(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new EmployeeController();
  const response = await controller.getEmployees(req.params.id);
  if (!response) res.status(404).send({message: "No post found"})
  return res.send(response);
});

export default router;