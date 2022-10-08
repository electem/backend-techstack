import express from "express";
import PanelDataController from '../controllers/paneldata.controller';

const router = express.Router();

router.post("/", async (req, res) => {
  const controller = new PanelDataController();
  const response = await controller.createPanelData(req.body);
  return res.send(response);
});

router.get("/", async (_req, res) => {
  const controller = new PanelDataController();
  const response = await controller.getPanelData();
  return res.send(response);
});

export default router