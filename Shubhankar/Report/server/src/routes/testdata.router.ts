import express from "express";
import {TestDataController} from "../controllers/testdata.controller";

const router = express.Router();

router.post("/", async (req, res) => {
  const controller = new TestDataController();
  const response = await controller.createTestData(req.body);
  return res.send(response);
});
router.get("/", async (_req, res) => {
  const controller = new TestDataController();
  const response = await controller.getTestData();
  return res.send(response);
});

export default router;