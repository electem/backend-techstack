import express from "express";
import TotorialsController from "../controllers/totorials.controller";

const router = express.Router();

router.post("/", async (req, res) => {
  const controller = new TotorialsController();
  const response = await controller.createTutorial(req.body);
  return res.send(response);
});
router.get("/", async (_req, res) => {
  const controller = new TotorialsController();
  const response = await controller.getTutorials();
  return res.send(response);
});
router.get("/:id", async (req, res) => {
  const controller = new TotorialsController();
  const response = await controller.getTutorial(req.params.id);
  if (!response) res.status(404).send({message: "No Totorials found"})
  return res.send(response);
});
router.put("/", async (req, res) => {
  const controller = new TotorialsController();
  const response = await controller.createTutorial(req.body);
  return res.send(response);
});
export default router