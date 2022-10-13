import express from "express";
import TutorialController from "../controllers/tutorials.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new TutorialController();
  const response = await controller.getTutorials();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new TutorialController();
  const response = await controller.createTutorial(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new TutorialController();
  const response = await controller.getTutorial(req.params.id);
  if (!response) res.status(404).send({ message: "No user found" });
  return res.send(response);
});

router.put("/", async (req, res) => {
  const controller = new TutorialController();
  const response = await controller.updateTutorial(req.body);
  return res.send(response);
});

router.delete("/:id", async (req, res) => {
  const controller = new TutorialController();
  const response = await controller.deleteTutorial(req.params.id);
  if (!response) res.status(404).send({ message: "No user found" });
  return res.send(response);
});

export default router;
