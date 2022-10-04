import express from "express";
import {CategoryController} from '../controllers/category.controller';

const router = express.Router();

router.post("/", async (req, res) => {
  const controller = new CategoryController();
  const response = await controller.createCategory(req.body);
  return res.send(response);
});

router.get("/", async (_req, res) => {
  const controller = new CategoryController();
  const response = await controller.getCategory();
  return res.send(response);
});
router.get("/:id", async (req, res) => {
  const controller = new CategoryController();
  const response = await controller.getCategorys(req.params.id);
  if (!response) res.status(404).send({message: "No Totorials found"})
  return res.send(response);
});
  

export default router;