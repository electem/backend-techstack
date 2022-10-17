import express, { response } from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();
router.post("/", async (req, res) => {
  const controller = new UserController();
  const response = await controller.createUser(req.body);
  return res.send(response);
});
router.get("/", async (req, res) => {
  const controller = new UserController();
  const response = await controller.getAuthentication(req.body,req.body.name);
  return res.send(response);
});
export default router;

