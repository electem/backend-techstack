import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();
router.post("/", async (req, res) => {
  const controller = new UserController();
  const response = await controller.createUser(req.body);
  return res.send(response);
});

export default router;
