import express from "express";
import { QuestionRepository } from "src/repositories/question.repository";
import {QuestionController} from '../controllers/question.controller';

const router = express.Router();

router.post("/", async (req, res) => {
  const controller = new QuestionController();
  const response = await controller.createQuestion(req.body);
  return res.send(response);
});

export default router;