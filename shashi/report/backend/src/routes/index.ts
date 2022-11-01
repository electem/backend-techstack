import express from "express";
import PingController from "../controllers/ping.controller";
import PanelRouter from "./panel.router";
import TestRouter from "./test.router";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/panel", PanelRouter);
router.use("/test", TestRouter);
export default router;