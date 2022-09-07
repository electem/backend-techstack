import express from "express";
import {PlayerController} from "../controllers/player.controller";

const router = express.Router();

router.post("/", async (req, res) => {
  const controller = new PlayerController();
  const response = await controller.createPlayer(req.body);
  return res.send(response);
});
router.get("/", async (_req, res) => {
  const controller = new PlayerController();
  const response = await controller.getPlayers();
  return res.send(response);
});
router.get("/:id", async (req, res) => {
  const controller = new PlayerController();
  const response = await controller.getPlayer(req.params.id);
  if (!response) res.status(404).send({message: "No Totorials found"})
  return res.send(response);
});

export default router;