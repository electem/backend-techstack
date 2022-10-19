import express from "express";
import ResourceController from "../controllers/resource.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ResourceController();
  const response = await controller.getResources();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new ResourceController();
  const response = await controller.createResource(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new ResourceController();
  const response = await controller.getResource(req.params.id);
  if (!response) res.status(404).send({message: "No user found"})
  return res.send(response);
});

export default router