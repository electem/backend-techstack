import express from "express";
import SampleController from "../controllers/sample.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new SampleController();
  const response = await controller.getSample();
  return res.send(response);
});
export default router;
