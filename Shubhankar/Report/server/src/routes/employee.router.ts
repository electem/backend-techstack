import express from "express";
import EmployeeController from "../controllers/employee.controller";

const router = express.Router();
router.get("/:id", async (req, res) => {
    const controller = new EmployeeController();
    const response = await controller.getEmployees(req.params.id);
    if (!response) res.status(404).send({ message: "No user found" });
  return res.send(response);
  });
  router.post("/", async (req, res) => {
    const controller = new EmployeeController();
    const response = await controller.createEmployee(req.body);
    return res.send(response);
  });

  router.put("/:id", async (req, res) => {
    const controller = new EmployeeController();
    const response = await controller.updateEmployee(req.params.id,req.body);
    return res.send(response);
  });

 router.post("/employee", async (req, res) => {
    const controller = new EmployeeController();
    const response = await controller.createEmployee(req.body);
    return res.send(response);
  });
 export default router;