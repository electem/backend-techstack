import express from "express";
import CompanyController from "../controllers/company.controllers";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new CompanyController();
  const response = await controller.getCompany();
  return res.send(response);
});
router.post("/", async (req, res) => {
  const controller = new CompanyController();
  const response = await controller.createCompany(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new CompanyController();
  const response = await controller.getCompanys(req.params.id);
  if (!response) res.status(404).send({message: "No user found"})
  return res.send(response);
});
router.delete("/:id", async (req, res) => {
  const controller = new CompanyController();
  const response = await controller.deleteCompanys(req.params.id);
  if (!response) res.status(404).send({message: "No user found"})
  return res.send(response);
});

export default router