import express from "express";
import GameController from '../controllers/game.controller';

const router = express.Router();

router.post("/", async (req, res) => {
  const controller = new GameController();
  const response = await controller.createGame(req.body);
  return res.send(response);
});
router.get("/", async (_req, res) => {
  const controller = new GameController();
  const response = await controller.getGames();
  return res.send(response);
});
router.get("/:id", async (req, res) => {
  const controller = new GameController();
  const response = await controller.getGame(req.params.id);
  if (!response) res.status(404).send({message: "No Games found"})
  return res.send(response);
});
router.put("/", async (req, res) => {
  const controller = new GameController();
  const response = await controller.updateGame(req.body);
  return res.send(response);
});
export default router